import * as React from "react";

import { colors } from "@df/multichannel-app-shared/styles/colors";
import { tagStyle, tagStyleHover } from "@df/multichannel-app-shared/styles/tags";
import { LinkType } from "../components/Link/interfaces/props";

export const linkStyle = (type: LinkType) => {
  let style: React.CSSProperties = {
    textDecoration: "none",
  };

  switch (type) {
    case "white":
      style.color = colors.white;
      break;
    case "grey":
      style.color = colors.grey3;
      break;
    case "tag":
      style = {
        ...style,
        ...tagStyle,
      };
      break;
    case "secondary":
      style.color = colors.green;
      break;
    case "primary":
    default:
      style.color = colors.blue;
      break;
  }

  return style;
};

export const linkStyleHover = (type: LinkType): React.CSSProperties => {
  let style: React.CSSProperties = {
    textDecoration: "underline",
  };

  switch (type) {
    case "tag":
      style = {
        ...style,
        ...tagStyleHover,
      };
      break;
    default:
      break;
  }

  return style;
};
