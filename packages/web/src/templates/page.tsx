import MDXRenderer from "gatsby-mdx/mdx-renderer";
import * as React from "react";

import SubNav from "@df/multichannel-app-shared-web/components/SubNav";
import { gridContainerStyles } from "@df/multichannel-app-shared-web/styles/grid";
import {
  MdxNode,
  MdxNodeFrontmatter,
} from "@df/multichannel-app-shared/interfaces/markdown";

import SEO from "../components/SEO";
import SiteLayout from "../containers/SiteLayout";

export interface PageTemplateProps {
  children: React.ReactNode;

  location: {
    pathname: string;
  };

  pageContext: {
    pagePath: string;
    node: MdxNode;
    frontmatter: MdxNodeFrontmatter;
  };
}

export default (props: PageTemplateProps) => {
  const { location, children } = props;
  const { frontmatter, node } = props.pageContext;

  const title = frontmatter.seo
    ? frontmatter.seo.title || frontmatter.title
    : frontmatter.title;
  const description = frontmatter.seo
    ? frontmatter.seo.description || node.excerpt
    : node.excerpt;

  return (
    <SiteLayout location={location}>
      <SEO title={title} description={description} />

      <article
        style={{
          ...gridContainerStyles,
        }}
      >
        <header>
          <h1>{frontmatter.title}</h1>
        </header>

        <SubNav items={frontmatter.subNavItems} />

        <MDXRenderer>
          {node.code.body}
        </MDXRenderer>
      </article>
    </SiteLayout>
  );
};
