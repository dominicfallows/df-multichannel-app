import { graphql } from "gatsby";
import * as React from "react";

import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";

import Link from "@df/multichannel-app-shared-web/components/Link";
import Bio from "../components/Bio";
import SEO from "../components/SEO";
import Layout from "../containers/Layout";

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

        <LayoutContextConsumer>
          {({ breakpoint }) => (
            <>
              <Bio />

              {posts.map(({ node }: { node: MarkdownRemarkNode }) => {
                const title = node.frontmatter.title || node.fields.slug;
                return (
                  <article
                    key={node.fields.slug}
                    style={{
                      padding: "1rem 0",
                      borderBottom: `1px dotted ${colors.grey2}`,
                      marginBottom: "1rem",
                    }}
                  >
                    <header
                      style={{
                        display: breakpoint === "sm" ? "block" : "flex",
                      }}
                    >
                      <h3
                        style={{
                          marginBottom: breakpoint === "sm" ? "0.5rem" : "1rem",
                          flexGrow: breakpoint === "sm" ? undefined : 1,
                        }}
                      >
                        <Link
                          style={{ color: colors.black }}
                          to={node.fields.slug}
                          title={title}
                          type="primary"
                        >
                          {title}
                        </Link>
                      </h3>

                      <nav
                        style={{
                          flexShrink: breakpoint === "sm" ? undefined : 1,
                          marginBottom:
                            breakpoint === "sm" ? "0.5rem" : undefined,
                        }}
                      >
                        {node.frontmatter.taxonomy.map((t: string) => (
                          <Link
                            to={`/blog/${t}`}
                            title={`More posts about #${t}`}
                            type="tag"
                            style={{
                              marginBottom: "5px",
                              marginLeft:
                                breakpoint === "sm" ? undefined : "10px",
                              marginRight:
                                breakpoint === "sm" ? "10px" : undefined,
                            }}
                          >
                            #{t}
                          </Link>
                        ))}
                      </nav>
                    </header>
                    <p
                      dangerouslySetInnerHTML={{ __html: node.excerpt }}
                      style={{
                        fontSize: "0.9em",
                        marginBottom: "1rem",
                      }}
                    />
                    <footer
                      style={{
                        fontSize: "0.8rem",
                        color: colors.grey2,
                      }}
                    >
                      {node.frontmatter.created}
                    </footer>
                  </article>
                );
              })}
            </>
          )}
        </LayoutContextConsumer>
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
            taxonomy
          }
        }
      }
    }
  }
`;
