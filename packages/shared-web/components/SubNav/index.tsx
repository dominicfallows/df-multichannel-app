import * as React from "react";

import Link from "../Link";

import { SubNavItem, SubNavProps } from "./interfaces/props";

class SubNav extends React.Component<SubNavProps> {
  static defaultProps = {
    items: [],
  };

  render() {
    const { items } = this.props;

    if (!items || items.length === 0) {
      return null;
    }

    return (
      <ul
        style={{
          listStyleType: "none",
          margin: "0 0 1.5rem 0",
          padding: 0,
          display: "flex",
        }}
      >
        {items.map((item: SubNavItem, i) => (
          <li
            key={i}
            style={{
              padding: 0,
              margin: "0.25rem 1.5rem 0.25rem 0",
            }}
          >
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
