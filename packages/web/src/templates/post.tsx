import * as React from "react";

import Chips from "@df/multichannel-app-shared-web/components/Chips";
import NextPrevNav from "@df/multichannel-app-shared-web/components/NextPrevNav";
import { gridContainerStyles } from "@df/multichannel-app-shared-web/styles/grid";

import { MdxNode } from "@df/multichannel-app-shared/interfaces/markdown";
import { colors } from "@df/multichannel-app-shared/styles/colors";

import MDXRenderer from "../../plugins/gatsby-mdx/mdx-renderer";
import Bio from "../components/Bio";
import PagePostHeader from "../components/PagePostHeader";
import SEO from "../components/SEO";
import SiteLayout from "../containers/SiteLayout";

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
      <SEO
        title={title}
        description={description}
        path={node.frontmatter.path || node.fields.path}
      />

      <SiteLayout location={location}>
        <article
          style={{
            ...gridContainerStyles,
          }}
        >
          {frontmatter.taxonomy && (
            <Chips
              /* clickableChips={frontmatter.taxonomy.map((t: string) => ({
                to: `/blog/${t}`,
                title: `More posts about #${t}`,
                label: `#${t}`,
              }))} */
              chips={frontmatter.taxonomy.map((t: string) => `#${t}`)}
              style={{
                margin: `1rem 0 1rem 0`,
              }}
            />
          )}

          <PagePostHeader
            title={frontmatter.title}
            subNavItems={frontmatter.subNavItems}
            standfirst={frontmatter.standfirst}
            created={frontmatter.created}
            updated={frontmatter.updated}
          />

          <MDXRenderer>{node.code.body}</MDXRenderer>

          <footer style={{ margin: "4rem 0" }}>
            <NextPrevNav next={next} prev={previous} />
          </footer>

          <aside
            style={{
              background: colors.grey2,
              padding: "1.5rem 1rem",
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
