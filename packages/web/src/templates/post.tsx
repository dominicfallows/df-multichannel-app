import * as React from "react";

import Chips from "@df/multichannel-app-shared-web/components/Chips";
import NextPrevNav from "@df/multichannel-app-shared-web/components/NextPrevNav";
import SubNav from "@df/multichannel-app-shared-web/components/SubNav";
import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";
import { gridContainerStyles } from "@df/multichannel-app-shared-web/styles/grid";
import { scale } from "@df/multichannel-app-shared-web/styles/typography";
import { articleTimeStr } from "@df/multichannel-app-shared/helpers/dates";
import {
  MdxNode,
  MdxNodeFrontmatter,
} from "@df/multichannel-app-shared/interfaces/markdown";

import Bio from "../components/Bio";
import SEO from "../components/SEO";
import SiteLayout from "../containers/SiteLayout";

export interface PostTemplateProps {
  children: React.ReactNode;

  location: {
    pathname: string;
  };

  pageContext: {
    pagePath: string;
    node: MdxNode;
    next: MdxNode;
    previous: MdxNode;
    frontmatter: MdxNodeFrontmatter;
  };
}

export default (props: PostTemplateProps) => {
  const { location, children } = props;
  const { frontmatter, previous, next, node } = props.pageContext;

  return (
    <>
      <SEO title={frontmatter.title} description={node.excerpt} />
      <SiteLayout location={location}>
        <LayoutContextConsumer>
          {({ breakpoint }) => (
            <article
              style={{
                ...gridContainerStyles,
              }}
            >
              <header>
                <h1>{frontmatter.title}</h1>
              </header>

              <SubNav items={frontmatter.subNavItems} />

              {children}

              {frontmatter.taxonomy && (
                <Chips
                  chips={frontmatter.taxonomy.map((t: string) => ({
                    to: `/blog/${t}`,
                    title: `More posts about #${t}`,
                    label: `#${t}`,
                  }))}
                />
              )}

              <footer>
                <p
                  style={{
                    ...scale(-1 / 2),
                    display: `block`,
                    marginBottom: `1rem`,
                    marginTop: `1rem`,
                  }}
                >
                  {articleTimeStr(frontmatter.created, frontmatter.updated)}
                </p>

                <NextPrevNav next={next} prev={previous} />
              </footer>

              <aside>
                <Bio />
              </aside>
            </article>
          )}
        </LayoutContextConsumer>
      </SiteLayout>
    </>
  );
};
