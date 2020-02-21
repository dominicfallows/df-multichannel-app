import * as React from "react";

import { gridContainerStyles } from "@df/multichannel-app-shared-web/styles/grid";
import { MdxNode } from "@df/multichannel-app-shared/interfaces/markdown";

import { MDXRenderer } from "gatsby-plugin-mdx";
import PagePostHeader from "../components/PagePostHeader";
import SEO from "../components/SEO";
import SiteLayout from "../containers/SiteLayout";

export interface PageTemplateProps {
  location: {
    pathname: string;
  };

  pageContext: {
    pagePath: string;
    node: MdxNode;
  };
}

export default (props: PageTemplateProps) => {
  const { location } = props;
  const { node } = props.pageContext;
  const { frontmatter } = node;

  const title = frontmatter.seo
    ? frontmatter.seo.title || frontmatter.title
    : frontmatter.title;
  const description = frontmatter.seo
    ? frontmatter.seo.description || node.excerpt
    : node.excerpt;

  console.log(node);

  return (
    <SiteLayout location={location}>
      <SEO
        title={title}
        description={description}
        path={node.frontmatter.path || node.fields.path}
      />

      <article
        style={{
          ...gridContainerStyles,
        }}
      >
        <PagePostHeader
          title={frontmatter.title}
          subNavItems={frontmatter.subNavItems}
          standfirst={frontmatter.standfirst}
        />

        <MDXRenderer>{node.body}</MDXRenderer>
      </article>
    </SiteLayout>
  );
};
