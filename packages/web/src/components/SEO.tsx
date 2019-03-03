import { graphql, StaticQuery } from "gatsby";
import * as React from "react";
import { Helmet } from "react-helmet";

export interface SEOProps {
  description?: string;
  lang?: string;
  meta?: [
    {
      name: string;
      content: string;
    }
  ];
  title?: string;
  homepage?: boolean;
  path: string;
}

const SEO = (props: SEOProps) => {
  const { description, lang, meta, title, homepage, path } = props;

  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const metaDescription =
          description || data.site.siteMetadata.description;
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={homepage ? data.site.siteMetadata.title : title}
            titleTemplate={
              homepage ? `%s` : `%s | ${data.site.siteMetadata.author}`}
            link={[
              {
                rel: "canonical",
                href: `${data.site.siteMetadata.siteUrl}${
                  path === "/" ? "" : path
                }`,
              },
            ]}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: title,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.site.siteMetadata.author,
              },
              {
                name: `twitter:title`,
                content: title,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ].concat(meta || [])}
          />
        );
      }}
    />
  );
};

SEO.defaultProps = {
  lang: `en`,
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
  }
`;
