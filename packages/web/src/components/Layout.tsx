import { Link } from "gatsby";
import * as React from "react";

import { rhythm, scale } from "../utils/typography";

export interface LayoutProps {
  location: {
    pathname: string;
  };
  title: string;
}

class Layout extends React.Component<LayoutProps> {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${process.env.__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              color: `inherit`,
              boxShadow: `none`,
              textDecoration: `none`
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      );
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginBottom: rhythm(-1),
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
            {title}
          </Link>
        </h3>
      );
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
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
          Built with{" "}
          <a href="https://www.gatsbyjs.org" target="_blank">
            Gatsby
          </a>
          . Unless otherwise stated, all{" "}
          <abbr
            title="text, images, graphics, logos, audio,
          video and other content"
          >
            content
          </abbr>{" "}
          is Copyright &copy; 2018 Dominic Fallows and licensed under the{" "}
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
          >
            Creative Commons Attribution-ShareAlike 4.0 International License
          </a>
          . The software in this project is Copyright &copy; 2018 Dominic
          Fallows and made available under the{" "}
          <a
            rel="license"
            href="https://opensource.org/licenses/MIT"
            target="_blank"
          >
            MIT license
          </a>
          .
        </footer>
      </div>
    );
  }
}

export default Layout;
