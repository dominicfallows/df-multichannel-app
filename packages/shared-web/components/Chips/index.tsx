import * as React from "react";

import { Consumer as LayoutContextConsumer } from "../../contexts/Layout";
import Link from "../Link";

import { ChipItem, ChipsProps } from "./interfaces/props";

class Chips extends React.Component<ChipsProps> {
  static defaultProps = {
    chips: [],
  };

  render() {
    const { chips } = this.props;

    if (!chips || chips.length === 0) {
      return null;
    }

    return (
      <LayoutContextConsumer>
        {({ breakpoint }) => (
          <nav
            style={{
              marginBottom: breakpoint === "sm" ? "0.5rem" : undefined,
            }}
          >
            {chips.map((chip: ChipItem, i: number) => (
              <Link
                key={i}
                to={chip.to}
                title={chip.title}
                type="tag"
                style={{
                  marginBottom: "5px",
                  marginLeft: breakpoint === "sm" ? undefined : "10px",
                  marginRight: breakpoint === "sm" ? "10px" : undefined,
                }}
              >
                {chip.label}
              </Link>
            ))}
          </nav>
        )}
      </LayoutContextConsumer>
    );
  }
}

export default Chips;
