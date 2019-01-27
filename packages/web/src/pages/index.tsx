import { graphql } from "gatsby";
import * as React from "react";

import Card from "@df/multichannel-app-shared-web/components/Card";
import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";
import { tagStyle } from "@df/multichannel-app-shared/styles/tags";

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
                  padding: "1rem 1rem",
                }}
              >
                <h2>Latest Posts</h2>

                <div
                  style={{ ...cardGridContainerStyles(breakpoint) }}
                >
                  {posts.map(({ node }: { node: MarkdownRemarkNode }, i) => {
                    const title = node.frontmatter.title;
                    return (
                      <Card
                        key={node.fields.path}
                        width={50}
                        to={node.fields.path}
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
                          dangerouslySetInnerHTML={{ __html: node.excerpt }}
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
                              ),
                            )}
                          </div>
                        )}

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
