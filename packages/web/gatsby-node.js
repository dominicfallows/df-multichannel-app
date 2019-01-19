const fs = require(`fs`);
const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const slash = require(`slash`);

const publicPath = "./public";

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve(`./src/templates/post.tsx`);
    const pageTemplate = path.resolve(`./src/templates/page.tsx`);

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___created], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    path
                  }
                  frontmatter {
                    path
                    title
                    type
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        // Create pages
        const edges = result.data.allMarkdownRemark.edges;

        edges.forEach((edge, index) => {
          let previous;
          let next;
          let template;

          switch (edge.node.frontmatter.type) {
            case "post":
              previous =
                index === edges.length - 1 ? null : edges[index + 1].node;
              next = index === 0 ? null : edges[index - 1].node;

              template = postTemplate;
              break;

            case "page":
              template = pageTemplate;
              break;

            default:
              return;
          }

          const path = edge.node.frontmatter.path || edge.node.fields.path;

          createPage({
            path: path,
            component: slash(template),
            context: {
              pathForId: path,
              previous,
              next,
            },
          });
        });
      })
    );
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const path = createFilePath({ node, getNode, trailingSlash: false });

    createNodeField({
      name: `path`,
      node,
      value: path,
    });
  }
};

exports.onPostBuild = async ({ graphql }) => {
  try {
    console.log("Generating JSON feed");

    const result = await graphql(`
      {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
        allMarkdownRemark(
          sort: { fields: [frontmatter___created], order: DESC }
          filter: { frontmatter: { type: { eq: "post" } } }
          limit: 1000
        ) {
          edges {
            node {
              excerpt
              fields {
                path
              }
              frontmatter {
                created
                updated
                title
              }
            }
          }
        }
      }
    `);

    if (result.errors) {
      console.log(result.errors);
      throw new Error(
        "Error creating JSON feed of grahpql allMarkdownRemarks of type `posts`"
      );
    }

    const { title, description, siteUrl, author } = result.data.site.siteMetadata;
    const posts = result.data.allMarkdownRemark.edges.map(edge => edge.node);
    
    const jsonFeed = {
      version: "https://jsonfeed.org/version/1",
      title: title,
      description: description,
      home_page_url: siteUrl,
      feed_url: `${siteUrl}/feed.json`,
      favicon: `${siteUrl}/icons/icon-48x48.png`,
      author: {
        name: author
      },
      items: posts.map(({ fields, frontmatter, excerpt }) => ({
        id: siteUrl + path.join(fields.path),
        url: siteUrl + path.join(fields.path),
        title: frontmatter.title,
        date_published: new Date(frontmatter.created).toISOString(),
        date_modified: new Date(frontmatter.updated).toISOString(),
        excerpt: excerpt
      }))
    };


    fs.writeFileSync(
      path.join(publicPath, "feed.json"),
      JSON.stringify(jsonFeed),
      "utf8"
    );

  } catch(err) {
    throw new Error(err);
  }

};
