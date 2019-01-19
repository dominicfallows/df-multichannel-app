import * as React from "react";

import Link from "@df/multichannel-app-shared-web/components/Link";
import githubIconSrc from "@df/multichannel-app-shared/content/assets/font-awesome/github-brands.svg";
import linkedinIconSrc from "@df/multichannel-app-shared/content/assets/font-awesome/linkedin-brands.svg";
import npmIconSrc from "@df/multichannel-app-shared/content/assets/font-awesome/npm-brands.svg";
import twitterIconSrc from "@df/multichannel-app-shared/content/assets/font-awesome/twitter-brands.svg";

export type IconLinkType = "twitter" | "linkedin" | "github" | "npm";

const IconLink = (props: {
  title: string;
  icon: IconLinkType;
  href: string;
  style?: React.CSSProperties;
}) => {
  const { title, icon, href, style } = props;

  let iconSrc: string | undefined;

  switch (icon) {
    case "twitter":
      iconSrc = twitterIconSrc;
      break;
    case "linkedin":
      iconSrc = linkedinIconSrc;
      break;
    case "github":
      iconSrc = githubIconSrc;
      break;
    case "npm":
      iconSrc = npmIconSrc;
      break;
    default:
      break;
  }

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
