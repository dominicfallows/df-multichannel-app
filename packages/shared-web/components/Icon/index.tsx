import * as React from "react";

import getIconSrc from "./helpers/getIconSrc";

import { IconType } from "./interfaces/types";

const Icon = (props: {
  title: string;
  icon: IconType;
  style?: React.CSSProperties;
}) => {
  const { title, icon, style } = props;
  const iconSrc = getIconSrc(icon);

  if (iconSrc) {
    return (
      <img
        src={iconSrc}
        alt={title}
        style={{
          display: "inline-block",
          width: "25px",
          height: "25px",
          ...style,
        }}
      />
    );
  }

  return null;
};

export default Icon;
