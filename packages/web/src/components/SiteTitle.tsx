import { graphql, Link, StaticQuery } from "gatsby";
import * as React from "react";

import { linearGradientCssString } from "@df/multichannel-app-shared/styles/gradients";
import {
  rhythm,
  scale,
} from "@df/multichannel-app-shared-web/styles/typography";

export interface SiteTitlePropsBase {
  location: {
    pathname: string;
  };
}

export interface SiteTitleProps extends SiteTitlePropsBase {
  data: {
    site: {
      siteMetadata: {
        titleParts: string[];
      };
    };
  };
}

const SiteTitle = (props: SiteTitlePropsBase) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            titleParts
          }
        }
      }
    `}
    render={data => {
      const { location } = props;
      const rootPath = `${process.env.__PATH_PREFIX__ || ""}/`;
      const titleParts = data.site.siteMetadata.titleParts;

      const siteTitleText = (
        <>
          <span
            style={{
              // display: "block",
              fontSize: "2rem",
              lineHeight: "2rem"
            }}
          >
            {titleParts[0]}
          </span>{" "}
          <span
            style={{
              // display: "block",
              fontSize: "1rem",
              lineHeight: "2rem"
            }}
          >
            {titleParts[1]}
          </span>{" "}
          <span
            style={{
              display: "block",
              fontSize: "1.5rem",
              lineHeight: "1.6rem",
              background: linearGradientCssString,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {titleParts[2]}
          </span>
        </>
      );

      let siteTitle = null;

      if (location.pathname === rootPath) {
        siteTitle = (
          <h1
            style={{
              margin: 0
            }}
          >
            <Link
              style={{
                color: `inherit`,
                boxShadow: `none`,
                textDecoration: `none`,
              }}
              to={`/`}
            >
              {siteTitleText}
            </Link>
          </h1>
        );
      } else {
        siteTitle = (
          <span
            style={{
              marginBottom: rhythm(1.5),
              marginTop: 0,
            }}
          >
            <Link
              style={{
                boxShadow: `none`,
                color: `inherit`,
                textDecoration: `none`,
              }}
              to={`/`}
            >
              {siteTitleText}
            </Link>
          </span>
        );
      }
      return siteTitle;
    }}
  />
);

export default SiteTitle;
