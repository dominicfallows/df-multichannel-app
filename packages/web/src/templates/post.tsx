import MDXRenderer from "gatsby-mdx/mdx-renderer";
import * as React from "react";

import Chips from "@df/multichannel-app-shared-web/components/Chips";
import NextPrevNav from "@df/multichannel-app-shared-web/components/NextPrevNav";
import SubNav from "@df/multichannel-app-shared-web/components/SubNav";
import { gridContainerStyles } from "@df/multichannel-app-shared-web/styles/grid";
import { scale } from "@df/multichannel-app-shared-web/styles/typography";
import { articleTimeStr } from "@df/multichannel-app-shared/helpers/dates";
import { MdxNode } from "@df/multichannel-app-shared/interfaces/markdown";

import Bio from "../components/Bio";
import SEO from "../components/SEO";
import SiteLayout from "../containers/SiteLayout";
import { colors } from "@df/multichannel-app-shared/styles/colors";

export interface PostTemplateProps {
  location: {
    pathname: string;
  };

  pageContext: {
    pagePath: string;
    node: MdxNode;
    next: MdxNode;
    previous: MdxNode;
  };
}

export default (props: PostTemplateProps) => {
  const { location } = props;
  const { previous, next, node } = props.pageContext;
  const { frontmatter } = node;

  const title = frontmatter.seo
    ? frontmatter.seo.title || frontmatter.title
    : frontmatter.title;
  const description = frontmatter.seo
    ? frontmatter.seo.description || node.excerpt
    : node.excerpt;

  return (
    <>
      <SEO title={title} description={description} />

      <SiteLayout location={location}>
        <article
          style={{
            ...gridContainerStyles,
          }}
        >
          <header>
            <h1>{frontmatter.title}</h1>
          </header>

          <SubNav items={frontmatter.subNavItems} />

          {frontmatter.standfirst && (
            <div style={{ fontSize: 1.4 }}>{frontmatter.standfirst}</div>
          )}

          <MDXRenderer>{node.code.body}</MDXRenderer>

          <footer
            style={{
              margin: "3rem 0",
            }}
          >
            <div
              style={{
                borderTop: `1px solid ${colors.grey1}`,
                borderBottom: `1px solid ${colors.grey1}`,
                padding: "1rem 0",
              }}
            >
              <p
                style={{
                  fontSize: "0.85em",
                  display: `block`,
                  marginBottom: `1rem`,
                  marginTop: `1rem`,
                  color: colors.grey3,
                  margin: `0 0 0.5rem 0`,
                }}
              >
                {articleTimeStr(frontmatter.created, frontmatter.updated)}.{" "}
              </p>

              {frontmatter.taxonomy && (
                <Chips
                  clickableChips={frontmatter.taxonomy.map((t: string) => ({
                    to: `/blog/${t}`,
                    title: `More posts about #${t}`,
                    label: `#${t}`,
                  }))}
                  style={{
                    margin: `0.5rem 0 0 0`,
                  }}
                />
              )}
            </div>

            <NextPrevNav
              next={next}
              prev={previous}
              style={{
                borderBottom: `1px solid ${colors.grey1}`,
              }}
            />
          </footer>

          <aside
            style={{
              background: colors.grey1,
              padding: "2rem 1rem 0",
              borderRadius: "3px",
            }}
          >
            <Bio />
          </aside>
        </article>
      </SiteLayout>
    </>
  );
};
