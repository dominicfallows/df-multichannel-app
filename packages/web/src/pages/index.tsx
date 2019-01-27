import { graphql } from "gatsby";
import * as React from "react";

import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";

import Card from "@df/multichannel-app-shared-web/components/Card";
import Link from "@df/multichannel-app-shared-web/components/Link";
import Bio from "../components/Bio";
import SEO from "../components/SEO";
import Layout from "../containers/Layout";

import {
  cardGridContainerStyles,
  gridContainerStyles,
} from "@df/multichannel-app-shared-web/styles/grid";
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
              <Bio isHome={true} />

              <section
                style={{
                  ...gridContainerStyles,
                  padding: "0 1rem",
                }}
              >
                <div
                  style={{ ...cardGridContainerStyles(breakpoint) }}
                >
                  {posts.map(({ node }: { node: MarkdownRemarkNode }, i) => {
                    const title = node.frontmatter.title;
                    return (
                      <Card
                        key={node.fields.path}
                        width={50}
                        style={{
                          // marginBottom: i + 1 < posts.length ? "1.5rem" : 0,
                        }}
                        to={node.fields.path}
                        title={title}
                      >
                        <div
                          style={{
                            display: breakpoint === "sm" ? "block" : "flex",
                          }}
                        >
                          <h3
                            style={{
                              marginBottom:
                                breakpoint === "sm" ? "0.5rem" : "1rem",
                              flexGrow: breakpoint === "sm" ? undefined : 1,
                            }}
                          >
                            {title}
                          </h3>

                          {node.frontmatter.taxonomy && (
                            <nav
                              style={{
                                flexShrink: breakpoint === "sm" ? undefined : 1,
                                marginBottom:
                                  breakpoint === "sm" ? "0.5rem" : undefined,
                              }}
                            >
                              {node.frontmatter.taxonomy.map(
                                (t: string, i: number) => (
                                  <Link
                                    key={i}
                                    to={`/blog/${t}`}
                                    title={`More posts about #${t}`}
                                    type="tag"
                                    style={{
                                      marginBottom: "5px",
                                      marginLeft:
                                        breakpoint === "sm"
                                          ? undefined
                                          : "10px",
                                      marginRight:
                                        breakpoint === "sm"
                                          ? "10px"
                                          : undefined,
                                    }}
                                  >
                                    #{t}
                                  </Link>
                                ),
                              )}
                            </nav>
                          )}
                        </div>
                        <p
                          dangerouslySetInnerHTML={{ __html: node.excerpt }}
                          style={{
                            fontSize: "0.9em",
                            marginBottom: "1rem",
                          }}
                        />
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: colors.grey2,
                          }}
                        >
                          {node.frontmatter.created}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </section>
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___created], order: DESC }
      filter: { frontmatter: { type: { eq: "post" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            path
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
