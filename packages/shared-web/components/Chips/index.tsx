import * as React from "react";

import { tagStyle } from "@df/multichannel-app-shared/styles/tags";
import Link from "../Link";

import { ChipsProps, ClickableChipItem } from "./interfaces/props";

class Chips extends React.Component<ChipsProps> {
  static defaultProps = {
    chips: [],
  };

  render() {
    const { style, chips, clickableChips } = this.props;

    if ((!chips || chips.length === 0) && (!clickableChips || clickableChips.length === 0)) {
      return null;
    }

    const chipStyle = {
      marginBottom: "5px",
      marginRight: "10px",
    };

    return (
      <nav style={style}>
        {clickableChips && clickableChips.map((chip: ClickableChipItem, i: number) => (
          <Link
            key={i}
            to={chip.to}
            title={chip.title}
            type="tag"
            style={chipStyle}
          >
            {chip.label}
          </Link>
        ))}

        {chips && chips.map((chip: string, i: number) => (
          <span
            key={i}
            style={{
              ...tagStyle,
              ...chipStyle,
            }}
          >
            {chip}
          </span>
        ))}
      </nav>
    );
  }
}

export default Chips;
