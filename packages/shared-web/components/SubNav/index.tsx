import * as React from "react";

import { colors } from "@df/multichannel-app-shared/styles/colors";

import Link from "../Link";

import { SubNavItem, SubNavProps } from "./interfaces/props";

class SubNav extends React.Component<SubNavProps> {
  static defaultProps = {
    items: []
  };

  render() {
    const { items } = this.props;

    if (!items || items.length === 0) {
      return null;
    }

    return (
      <ul style={{
        listStyleType: "none",
        margin: "0 0 1rem 0",
        padding: 0,
        display: "flex"
      }}>
        {items.map((item: SubNavItem, i) => (
          <li key={i} style={{
            padding: "0.5rem 1rem",
            margin: "0 0.5rem 0 0",
            background: colors.grey1
          }}>
            <Link to={item.to} title={item.title} type="secondary">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}

export default SubNav;
