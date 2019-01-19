const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const slash = require(`slash`);

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
                    slug
                  }
                  frontmatter {
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

          createPage({
            path: edge.node.fields.slug,
            component: slash(template),
            context: {
              slug: edge.node.fields.slug,
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
    const slug = createFilePath({ node, getNode, trailingSlash: false });
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    });
  }
};
