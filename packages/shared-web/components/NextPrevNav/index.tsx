import * as React from "react";

import SubNav from "../SubNav";
import { SubNavItem } from "../SubNav/interfaces/props";

import { NextPrevNavProps } from "./interfaces/props";

class NextPrevNav extends React.Component<NextPrevNavProps> {
  render() {
    const { style, next, prev } = this.props;

    if (!next && !prev) {
      return null;
    }

    const items: SubNavItem[] = [];

    if (next) {
      items.push({
        to: next.frontmatter.path || next.fields.path,
        title: next.frontmatter.title,
      });
    }

    if (prev) {
      items.push({
        to: prev.frontmatter.path || prev.fields.path,
        title: prev.frontmatter.title,
      });
    }

    return (
      <nav
        style={{
          ...style,
        }}
      >
        <h4
          style={{
            marginBottom: "0.5rem",
          }}
        >
          Other posts:
        </h4>

        <SubNav items={items} />
      </nav>
    );
  }
}

export default NextPrevNav;
