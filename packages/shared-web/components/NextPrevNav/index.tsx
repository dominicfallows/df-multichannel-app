import * as React from "react";

import { colors } from "@df/multichannel-app-shared/styles/colors";

import { Consumer as LayoutContextConsumer } from "../../contexts/Layout";
import Link from "../Link";

import { NextPrevNavProps } from "./interfaces/props";

class NextPrevNav extends React.Component<NextPrevNavProps> {
  render() {
    const { next, prev } = this.props;

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
              margin: `1rem 0`,
              borderTop: `1px solid ${colors.grey1}`,
              borderBottom: `1px solid ${colors.grey1}`,
            }}
          >
            <div
              style={{
                padding: `0.5rem 1rem 0.5rem 0`,
              }}
            >
              {prev && (
                <Link
                  type="secondary"
                  to={prev.fields.path}
                  title={prev.frontmatter.title}
                  rel="prev"
                >
                  ← {prev.frontmatter.title}
                </Link>
              )}
            </div>
            <div
              style={{
                padding: `0.5rem 0 0.5rem 1rem`,
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
            </div>
          </nav>
        )}
      </LayoutContextConsumer>
    );
  }
}

export default NextPrevNav;
