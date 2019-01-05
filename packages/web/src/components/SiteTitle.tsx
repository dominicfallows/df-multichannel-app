import { graphql, Link, StaticQuery } from "gatsby";
import * as React from "react";

import { linearGradientCssString } from "@df/multichannel-app-shared/styles/gradients";
import {
  rhythm,
  scale,
} from "@df/multichannel-app-shared/styles/typography-web";

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
              display: "block",
              ...scale(1.5),
            }}
          >
            {titleParts[0]}
          </span>{" "}
          <span
            style={{
              display: "block",
            }}
          >
            {titleParts[1]}
          </span>{" "}
          <span
            style={{
              display: "block",
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
              marginBottom: rhythm(1.5),
              marginTop: 0,
              clear: "both",
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
