import { WindowLocation } from "@reach/router";
import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useState } from "react";

import icon from "@df/multichannel-app-shared/content/assets/icon.svg";
import logo from "@df/multichannel-app-shared/content/assets/logo.svg";
import { colors } from "@df/multichannel-app-shared/styles/colors";

export interface SiteTitleProps {
  location: WindowLocation;
}

export interface SiteTitleState {
  hover: boolean;
}

export interface SiteTitleStaticQueryInterface {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const SiteTitle = (props: SiteTitleProps) => {
  const { location } = props;
  const [hover, setHover] = useState(false);
  const { site }: SiteTitleStaticQueryInterface = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  const siteLogo = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <img
        src={location.pathname === "/" ? icon : logo}
        alt="Dominic Fallows"
        style={{
          height: "30px",
          width: "auto",
          display: "block",
          marginBottom: 0,
        }}
      />
    </div>
  );

  return (
    <Link
      style={{
        color: `inherit`,
        boxShadow: `none`,
        textDecoration: `none`,
        background: hover ? colors.blue : "transparent",
        display: "block",
        padding: "0.5rem 1rem",
      }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      to={`/`}
      title={site.siteMetadata.title}
    >
      {siteLogo}
    </Link>
  );
};

export default SiteTitle;
