import { graphql, Link, StaticQuery } from "gatsby";
import * as React from "react";

import logo from "@df/multichannel-app-shared/content/assets/logo.svg";
import { colors } from "@df/multichannel-app-shared/styles/colors";

export interface SiteTitleState {
  hover: boolean;
}

export interface SiteTitleDataInterface {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

class SiteTitle extends React.Component<{}, SiteTitleState> {
  state = {
    hover: false,
  };

  mouseOver = () =>
    this.setState({
      hover: true,
    });

  mouseOut = () =>
    this.setState({
      hover: false,
    });

  render() {
    return (
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={(data: SiteTitleDataInterface) => {
          const siteLogo = (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={logo}
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
                background: this.state.hover ? colors.blue : "transparent",
                display: "block",
                padding: "0.5rem 1rem",
              }}
              onMouseOver={() => this.mouseOver()}
              onMouseOut={() => this.mouseOut()}
              to={`/`}
              title={data.site.siteMetadata.title}
            >
              {siteLogo}
            </Link>
          );
        }}
      />
    );
  }
}

export default SiteTitle;
