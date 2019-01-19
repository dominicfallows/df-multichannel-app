import { graphql } from "gatsby";
import * as React from "react";

import Link from "@df/multichannel-app-shared-web/components/Link";
import {
  rhythm,
  scale,
} from "@df/multichannel-app-shared-web/styles/typography";
import { MarkdownRemarkNode } from "@df/multichannel-app-shared/interfaces/markdown";
import { colors } from "@df/multichannel-app-shared/styles/colors";

import Bio from "../components/Bio";
import SEO from "../components/SEO";
import Layout from "../containers/Layout";

export interface PostTemplateProps {
  data: {
    markdownRemark: MarkdownRemarkNode;
  };

  location: {
    pathname: string;
  };

  pageContext: {
    next: MarkdownRemarkNode;
    previous: MarkdownRemarkNode;
  };
}

class PostTemplate extends React.Component<PostTemplateProps> {
  render() {
    const { markdownRemark } = this.props.data;
    const post = markdownRemark;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />

        <article>
          <header>
            <h1>{post.frontmatter.title}</h1>
          </header>

          <div dangerouslySetInnerHTML={{ __html: post.html }} />

          <footer>
            <p
              style={{
                ...scale(-1 / 5),
                display: `block`,
                marginBottom: rhythm(1),
                marginTop: rhythm(-1),
              }}
            >
              Created: {post.frontmatter.created}.{" "}
              {post.frontmatter.created !== post.frontmatter.updated &&
                `Last updated: ${post.frontmatter.updated}`}
            </p>

            <ul
              style={{
                display: `flex`,
                flexWrap: `wrap`,
                justifyContent: `space-between`,
                listStyle: `none`,
                padding: 0,
                margin: `${rhythm(1)} 0`,
                borderTop: `1px solid ${colors.grey1}`,
                borderBottom: `1px solid ${colors.grey1}`,
              }}
            >
              <li
                style={{
                  margin: 0,
                  padding: `${rhythm(0.5)} ${rhythm(1)} ${rhythm(0.5)} 0`,
                }}
              >
                {previous && (
                  <Link
                    type="secondary"
                    to={previous.fields.path}
                    title={previous.frontmatter.title}
                    rel="prev"
                  >
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>
              <li
                style={{
                  margin: 0,
                  padding: `${rhythm(0.5)} 0 ${rhythm(0.5)} ${rhythm(1)}`,
                }}
              >
                {next && (
                  <Link
                    type="secondary"
                    to={next.fields.path}
                    title={next.frontmatter.title}
                    rel="next"
                  >
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          </footer>
        </article>

        <Bio />
      </Layout>
    );
  }
}

export default PostTemplate;

export const pageQuery = graphql`
  query($pathForId: String!) {
    markdownRemark(fields: { path: { eq: $pathForId } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        created(formatString: "Do MMMM YYYY")
        updated(formatString: "Do MMMM YYYY")
      }
    }
  }
`;
