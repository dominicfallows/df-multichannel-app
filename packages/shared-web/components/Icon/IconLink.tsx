import * as React from "react";

import getIconSrc from "./helpers/getIconSrc";

import { IconType } from "./interfaces/types";

const IconLink = (props: {
  title: string;
  icon: IconType;
  href: string;
  style?: React.CSSProperties;
}) => {
  const { title, icon, href, style } = props;

  const iconSrc = getIconSrc(icon);

  return (
    <a
      href={href}
      title={title}
      rel="nofollow"
      target="_blank"
      style={{
        display: "inline-block",
        ...style,
      }}
    >
      {iconSrc && (
        <img
          src={iconSrc}
          alt={title}
          style={{
            display: "block",
            width: "25px",
            maxHeight: "25px",
          }}
        />
      )}
    </a>
  );
};

export default IconLink;
