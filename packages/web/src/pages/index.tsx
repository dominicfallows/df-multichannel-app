import { graphql, Link } from "gatsby";
import * as React from "react";

import Bio from "../components/Bio";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { rhythm } from "../utils/typography";

import { MarkdownRemarkNode } from "@df/multichannel-app-shared/interfaces/markdown";

export interface BlogIndexProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        titleParts: string[];
      }
    };
  
    allMarkdownRemark: {
      edges: [{
        node: MarkdownRemarkNode;
      }];
    };
  };

  location: {
    pathname: string;
  };
}

class BlogIndex extends React.Component<BlogIndexProps> {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    const siteTitleParts = data.site.siteMetadata.titleParts;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={this.props.location} titleParts={siteTitleParts}>
        <SEO title={siteTitle} homepage={true} />
        <Bio />
        {posts.map(({ node }: { node: MarkdownRemarkNode }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          );
        })}
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        titleParts
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
