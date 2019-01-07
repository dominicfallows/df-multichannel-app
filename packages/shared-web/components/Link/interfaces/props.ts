import * as React from "react";

export type LinkType = "primary" | "secondary" | "white";

export interface LinkProps {
  type: LinkType;
  to: string;
  target?: string;
  title: string;
  style?: React.CSSProperties;
  activeStyle?: React.CSSProperties;
  rel?: string;
}