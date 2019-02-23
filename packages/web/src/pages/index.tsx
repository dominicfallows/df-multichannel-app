import { graphql } from "gatsby";
import * as React from "react";

import Card from "@df/multichannel-app-shared-web/components/Card";
import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";
import { articleTimeStr } from "@df/multichannel-app-shared/helpers/dates";
import { tagStyle } from "@df/multichannel-app-shared/styles/tags";

import Bio from "../components/Bio";
import SEO from "../components/SEO";
import SiteLayout from "../containers/SiteLayout";

import {
  cardGridContainerStyles,
  gridContainerStyles,
} from "@df/multichannel-app-shared-web/styles/grid";
import { MdxNode } from "@df/multichannel-app-shared/interfaces/markdown";
import { colors } from "@df/multichannel-app-shared/styles/colors";

export interface BlogIndexProps {
  data: {
    allMdx: {
      edges: [
        {
          node: MdxNode;
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
    const posts = data.allMdx.edges;

    return (
      <SiteLayout location={this.props.location}>
        <SEO homepage={true} />

        <LayoutContextConsumer>
          {({ breakpoint }) => (
            <>
              <Bio isHome={true} />

              <section
                style={{
                  borderTop: `4px solid ${colors.grey1}`,
                }}
              >
                <div
                  style={{
                    ...gridContainerStyles,
                    padding: "2rem 1rem",
                  }}
                >
                  <h2>Latest Posts</h2>
                  <div style={{ ...cardGridContainerStyles(breakpoint) }}>
                    {posts.map(({ node }: { node: MdxNode }, i) => {
                      const path = node.frontmatter.path || node.fields.path;
                      const title = node.frontmatter.title;
                      const description = node.frontmatter.seo
                        ? node.frontmatter.seo.description || node.excerpt
                        : node.excerpt;

                      return (
                        <Card
                          key={path}
                          width={50}
                          to={path}
                          title={title}
                        >
                          <h3
                            style={{
                              marginBottom: "0.5rem",
                            }}
                          >
                            {title}
                          </h3>

                          <p
                            dangerouslySetInnerHTML={{ __html: description }}
                            style={{
                              fontSize: "0.9em",
                              marginBottom: "1rem",
                            }}
                          />

                          {node.frontmatter.taxonomy && (
                            <div
                              style={{
                                marginBottom: "0.5rem",
                              }}
                            >
                              {node.frontmatter.taxonomy.map(
                                (t: string, ti: number) => (
                                  <span
                                    key={ti}
                                    style={{
                                      ...tagStyle,
                                      marginBottom: 5,
                                      marginRight: 10,
                                    }}
                                  >
                                    #{t}
                                  </span>
                                )
                              )}
                            </div>
                          )}

                          <div
                            style={{
                              fontSize: "0.8rem",
                              color: colors.grey2,
                            }}
                          >
                            {articleTimeStr(
                              node.frontmatter.created,
                              node.frontmatter.updated,
                            )}
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </section>
            </>
          )}
        </LayoutContextConsumer>
      </SiteLayout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___created], order: DESC }
      filter: { fields: { type: { eq: "post" } } }
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
            taxonomy
            seo {
              description
            }
          }
        }
      }
    }
  }
`;
