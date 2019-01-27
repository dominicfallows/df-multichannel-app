import * as React from "react";

export type LinkType = "primary" | "secondary" | "white" | "grey" | "tag";

export interface LinkProps {
  type: LinkType;
  to: string;
  target?: string;
  title: string;
  style?: React.CSSProperties;
  activeStyle?: React.CSSProperties;
  rel?: string;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}
