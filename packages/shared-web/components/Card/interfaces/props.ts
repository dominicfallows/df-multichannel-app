import * as React from "react";

export interface CardProps {
  to: string;
  target?: string;
  title: string;
  style?: React.CSSProperties;
  activeStyle?: React.CSSProperties;
  rel?: string;
  width?: 25 | 33 | 50 | 100;
}
