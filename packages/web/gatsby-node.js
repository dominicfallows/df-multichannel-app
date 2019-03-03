const Promise = require("bluebird");
const { createFilePath } = require("gatsby-source-filesystem");

const createPosts = require("./tasks/createPosts");
const createPages = require("./tasks/createPages");

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

    if (path.startsWith("/dummy")) {
      type = "dummyModel";
    }
    
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
      code {
        body
      }
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
        standfirst
        toc
        seo {
          title
          description
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
  }
};
