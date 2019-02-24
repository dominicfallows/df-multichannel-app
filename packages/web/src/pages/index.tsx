import { graphql } from "gatsby";
import * as React from "react";

import Card from "@df/multichannel-app-shared-web/components/Card";
import Chips from "@df/multichannel-app-shared-web/components/Chips";
import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";
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

              <section>
                <div
                  style={{
                    ...gridContainerStyles,
                    marginTop: "3rem",
                    marginBottom: "3rem",
                  }}
                >
                  <h2 id="blog">Blog</h2>

                  <div style={{ ...cardGridContainerStyles(breakpoint) }}>
                    {posts.map(({ node }: { node: MdxNode }, i) => {
                      const path = node.frontmatter.path || node.fields.path;
                      const title = node.frontmatter.title;
                      const description =
                        (node.frontmatter.seo &&
                          node.frontmatter.seo.description) ||
                        node.excerpt;

                      return (
                        <Card key={path} width={50} to={path} title={title}>
                          <h3
                            style={{
                              marginBottom: "0.5rem",
                            }}
                          >
                            {title}
                          </h3>

                          <p
                            style={{
                              fontSize: "0.9em",
                              marginBottom: "1rem",
                            }}
                          >
                            {description}
                          </p>

                          {node.frontmatter.taxonomy && (
                            <Chips
                              chips={node.frontmatter.taxonomy.map(
                                (t: string) => `#${t}`
                              )}
                            />
                          )}
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
