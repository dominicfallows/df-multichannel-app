import { graphql } from "gatsby";
import * as React from "react";

import SubNav from "@df/multichannel-app-shared-web/components/SubNav";
import { gridContainerStyles } from "@df/multichannel-app-shared-web/styles/grid";
import { MarkdownRemarkNode } from "@df/multichannel-app-shared/interfaces/markdown";

import SEO from "../components/SEO";
import Layout from "../containers/Layout";

export interface PageTemplateProps {
  data: {
    markdownRemark: MarkdownRemarkNode;
  };

  location: {
    pathname: string;
  };
}

class PageTemplate extends React.Component<PageTemplateProps> {
  render() {
    const { markdownRemark } = this.props.data;
    const post = markdownRemark;

    return (
      <Layout location={this.props.location}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />

        <article
          style={{
            ...gridContainerStyles,
          }}
        >
          <header>
            <h1>{post.frontmatter.title}</h1>
          </header>

          <SubNav items={post.frontmatter.subNavItems} />

          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </Layout>
    );
  }
}

export default PageTemplate;

export const pageQuery = graphql`
  query($pathForId: String!) {
    markdownRemark(fields: { path: { eq: $pathForId } }) {
      id
      html
      frontmatter {
        title
        subNavItems {
          to
          title
        }
      }
    }
  }
`;
