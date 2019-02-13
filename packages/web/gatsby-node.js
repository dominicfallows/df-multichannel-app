const Promise = require("bluebird");
const fs = require("fs");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const createPosts = require("./tasks/createPosts");
const createPages = require("./tasks/createPages");

const publicPath = "./public";

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const path = createFilePath({ node, getNode, trailingSlash: false });

    createNodeField({
      name: "path",
      node,
      value: path,
    });

    // Assign node type
    let type = "page";
    if (path.startsWith("/blog/")) {
      type = "post";
    }

    createNodeField({
      name: "type",
      node,
      value: type,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const edgesQueryStr = `edges {
    node {
      id
      fields {
        path
        type
      }
      fileAbsolutePath
      frontmatter {
        path
        title
        created
        updated
        taxonomy
        subNavItems {
          to
          title
        }
      }
      excerpt(pruneLength: 160)
      tableOfContents
      timeToRead
      wordCount {
        paragraphs
        sentences
        words
      }
    }
  }`;
  
  try {
    await Promise.all([
      createPosts({
        edgesQueryStr,
        graphql,
        createPage,
        reporter,
      }),
      createPages({
        edgesQueryStr,
        graphql,
        createPage,
        reporter,
      }),
    ]);
  } catch (error) {
    reporter.panic(error);
    throw Error(error);
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
        allMdx(
          sort: { fields: [frontmatter___created], order: DESC }
          filter: { fields: { type: { eq: "post" } } }
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
        "Error creating JSON feed of grahpql allMdx of type `posts`"
      );
    }

    const {
      title,
      description,
      siteUrl,
      author,
    } = result.data.site.siteMetadata;
    const posts = result.data.allMdx.edges.map(edge => edge.node);

    const jsonFeed = {
      version: "https://jsonfeed.org/version/1",
      title: title,
      description: description,
      home_page_url: siteUrl,
      feed_url: `${siteUrl}/feed.json`,
      favicon: `${siteUrl}/icons/icon-48x48.png`,
      author: {
        name: author,
      },
      items: posts.map(({ fields, frontmatter, excerpt }) => ({
        id: siteUrl + path.join(fields.path),
        url: siteUrl + path.join(fields.path),
        title: frontmatter.title,
        date_published: new Date(frontmatter.created).toISOString(),
        date_modified: new Date(frontmatter.updated).toISOString(),
        excerpt: excerpt,
      })),
    };

    fs.writeFileSync(
      path.join(publicPath, "feed.json"),
      JSON.stringify(jsonFeed),
      "utf8"
    );
  } catch (err) {
    throw new Error(err);
  }
};
