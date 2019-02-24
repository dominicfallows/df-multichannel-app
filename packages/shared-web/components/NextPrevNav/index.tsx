import * as React from "react";

import { colors } from "@df/multichannel-app-shared/styles/colors";

import { Consumer as LayoutContextConsumer } from "../../contexts/Layout";
import Link from "../Link";

import { NextPrevNavProps } from "./interfaces/props";

class NextPrevNav extends React.Component<NextPrevNavProps> {
  render() {
    const { style, next, prev } = this.props;

    if (!next && !prev) {
      return null;
    }

    return (
      <LayoutContextConsumer>
        {({ breakpoint }) => (
          <nav
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
              fontSize: "0.9em",
              ...style,
            }}
          >
            <div
              style={{
                padding: `1rem 1rem 1rem 0`,
              }}
            >
              {prev && (
                <Link
                  type="secondary"
                  to={prev.frontmatter.path || prev.fields.path}
                  title={prev.frontmatter.title}
                  rel="prev"
                >
                  ← {prev.frontmatter.title}
                </Link>
              )}
            </div>
            <div
              style={{
                padding: `1rem 0 1rem 1rem`,
              }}
            >
              {next && (
                <Link
                  type="secondary"
                  to={next.frontmatter.path || next.fields.path}
                  title={next.frontmatter.title}
                  rel="next"
                >
                  {next.frontmatter.title} →
                </Link>
              )}
            </div>
          </nav>
        )}
      </LayoutContextConsumer>
    );
  }
}

export default NextPrevNav;
