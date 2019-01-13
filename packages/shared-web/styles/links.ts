import * as React from "react";

import { colors } from "@df/multichannel-app-shared/styles/colors";
import { LinkType } from "../components/Link/interfaces/props";

export const linkStyle = (type: LinkType) => {
  const style: React.CSSProperties = {
    textDecoration: "none",
    paddingBottom: "2px"
  };

  switch(type) {
    case "white":
      style.color = colors.white;
      break;
    case "grey":
      style.color = colors.grey2;
      break;
    case "secondary": 
      style.color = colors.green;
      break;
    case "primary":
      style.color = colors.blue;
  }
  
  return style;
};

export const linkStyleHover = (type: LinkType) => {
  const style: React.CSSProperties = {
    borderBottomStyle: "solid",
    borderBottomWidth: "1px"
  };

  switch(type) {
    case "white":
      style.borderBottomColor = colors.white;
      break;
    case "grey":
      style.borderBottomColor = colors.grey2;
      break;
    case "secondary": 
      style.borderBottomColor = colors.green;
      break;
    case "primary":
      style.borderBottomColor = colors.blue;
  }
  
  return style;
};

export const linkStyleActive = (type: LinkType) => {
  const style: React.CSSProperties = {
    textDecoration: "none",
    borderBottomStyle: "solid",
    borderBottomWidth: "2px"
  };

  switch(type) {
    case "white":
      style.borderBottomColor = colors.white;
      break;
    case "grey":
      style.borderBottomColor = colors.grey2;
      break;
    case "secondary": 
      style.borderBottomColor = colors.green;
      break;
    case "primary":
      style.borderBottomColor = colors.blue;
  }
  
  return style;
};