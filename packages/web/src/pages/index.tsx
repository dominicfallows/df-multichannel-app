import { graphql } from "gatsby";
import * as React from "react";

import Link from "@df/multichannel-app-shared-web/components/Link";
import Bio from "../components/Bio";
import SEO from "../components/SEO";
import Layout from "../containers/Layout";

import { rhythm } from "@df/multichannel-app-shared-web/styles/typography";
import { MarkdownRemarkNode } from "@df/multichannel-app-shared/interfaces/markdown";
import { colors } from "@df/multichannel-app-shared/styles/colors";

export interface BlogIndexProps {
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: MarkdownRemarkNode;
        }
      ];
    };
  };

  location: {
    pathname: string;
  };
}

class BlogIndex extends React.Component<BlogIndexProps> {
  render() {
    const { data } = this.props;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout location={this.props.location}>
        <SEO homepage={true} />

        <Bio />

        {posts.map(({ node }: { node: MarkdownRemarkNode }) => {
          const title = node.frontmatter.title || node.fields.slug;
          return (
            <article
              key={node.fields.slug}
              style={{
                padding: rhythm(1),
                border: `1px solid #efefef`,
                marginBottom: rhythm(1),
                boxShadow: `#dedede 0px 3px 10px`,
                borderRadius: `6px`,
                transition: `transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s, padding 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s`,
              }}
            >
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link
                  style={{ borderBottomColor: "transparent" }}
                  to={node.fields.slug}
                  title={title}
                  type="primary"
                >
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.created}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </article>
          );
        })}
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___created], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            created(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
