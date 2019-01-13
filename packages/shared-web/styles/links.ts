import * as React from "react";

import { colors } from "@df/multichannel-app-shared/styles/colors";
import { LinkType } from "../components/Link/interfaces/props";

export const linkStyle = (type: LinkType) => {
  const style: React.CSSProperties = {
    textDecoration: "none"
  };

  switch (type) {
    case "white":
      style.color = colors.white;
      break;
    case "grey":
      style.color = colors.grey2;
      break;
    case "tag":
      style.color = colors.grey2;
      style.backgroundColor = colors.grey1;
      style.display = "inline-block";
      style.fontSize = "12px";
      style.padding = "2px 4px";
      break;
    case "secondary":
      style.color = colors.green;
      break;
    case "primary":
      style.color = colors.blue;
  }

  return style;
};

export const linkStyleHover = (type: LinkType): React.CSSProperties => {
  const style: React.CSSProperties = {
    textDecoration: "underline"
  };

  switch (type) {
    case "tag":
      style.color = colors.blue;
      style.textDecoration = "none";
      break;
    default:
      break;
  }

  return style;
};
