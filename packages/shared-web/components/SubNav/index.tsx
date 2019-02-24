import * as React from "react";

import { colors } from "@df/multichannel-app-shared/styles/colors";

import Icon from "../Icon";
import Link from "../Link";

import { SubNavItem, SubNavProps } from "./interfaces/props";

class SubNav extends React.Component<SubNavProps> {
  static defaultProps = {
    items: [],
  };

  render() {
    const { items, style } = this.props;

    if (!items || items.length === 0) {
      return null;
    }

    return (
      <ul
        style={{
          listStyleType: "none",
          margin: "0 0 1.5rem 0",
          padding: 0,
          borderTop: `1px dotted ${colors.grey2}`,
          ...style,
        }}
      >
        {items.map((item: SubNavItem, i) => (
          <li
            key={i}
            style={{
              lineHeight: "1.4em",
              fontSize: "1em",
              margin: 0,
              borderBottom: `1px dotted ${colors.grey2}`,
              padding: "0.5rem 0 0.4rem 0",
            }}
          >
            <Link
              to={item.to}
              title={item.title}
              type="secondary"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Icon
                icon="chevronRightSolid"
                title={item.title}
                style={{ opacity: 0.25, height: "0.9rem" }}
              />{" "}
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default SubNav;
