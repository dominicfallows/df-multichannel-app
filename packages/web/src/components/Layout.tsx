import { graphql, Link, StaticQuery } from "gatsby";
import * as React from "react";

// import { colors } from "@df/multichannel-app-shared/styles/colors";
import {
  linearGradientBlock1remStyle,
  linearGradientCssString,
} from "@df/multichannel-app-shared/styles/gradients";

import { rhythm, scale } from "../utils/typography";

export interface LayoutPropsBase {
  location: {
    pathname: string;
  };
}
export interface LayoutProps extends LayoutPropsBase {
  data: {
    site: {
      siteMetadata: {
        titleParts: string[];
      }
    };
  };
}

class Layout extends React.Component<LayoutProps> {
  render() {
    const { location, data, children } = this.props;
    const rootPath = `${process.env.__PATH_PREFIX__ || ""}/`;
    const titleParts = data.site.siteMetadata.titleParts;

    const siteTitle = (
      <>
        <span
          style={{
            display: "block",
            ...scale(1.5)
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

    let header = null;

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            marginBottom: rhythm(1.5),
            marginTop: 0,
            clear: "both"
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
            {siteTitle}
          </Link>
        </h1>
      );
    } else {
      header = (
        <h3
          style={{
            marginBottom: rhythm(1.5),
            marginTop: 0
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
            {siteTitle}
          </Link>
        </h3>
      );
    }
    return (
      <>
        <div
          style={{
            ...linearGradientBlock1remStyle,
          }}
        />
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: `740px`,
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {header}
          {children}
          <footer
            style={{
              fontSize: `12px`,
              marginTop: `4rem`,
            }}
          >
            <Link to="/legals" title="Legals">The legal stuff</Link>. Built with{" "}
            <Link to="https://www.gatsbyjs.org" title="GatsbyJS" target="_blank">
              Gatsby
            </Link>
            .
          </footer>
        </div>
      </>
    );
  }
}

export default (props: LayoutPropsBase) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            titleParts
          }
        }
      }
    `}
    render={data => <Layout {...props} data={data} />}
  />
);