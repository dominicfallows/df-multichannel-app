import { graphql, Link } from "gatsby";
import * as React from "react";

import Bio from "../components/Bio";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import { rhythm, scale } from "../utils/typography";

import { MarkdownRemarkNode } from "@df/shared/interfaces/markdown";

export interface BlogPostTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        author: string;
      }
    };

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

class BlogPostTemplate extends React.Component<BlogPostTemplateProps> {
  render() {
    const { markdownRemark, site } = this.props.data;
    const post = markdownRemark;
    const siteTitle = site.siteMetadata.title;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.frontmatter.title} description={post.excerpt} />
        <h1>{post.frontmatter.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {post.frontmatter.date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
