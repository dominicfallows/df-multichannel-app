// Social icons
import githubIconSrc from "@df/multichannel-app-shared/content/assets/font-awesome/github-brands.svg";
import linkedinIconSrc from "@df/multichannel-app-shared/content/assets/font-awesome/linkedin-brands.svg";
import npmIconSrc from "@df/multichannel-app-shared/content/assets/font-awesome/npm-brands.svg";
import twitterIconSrc from "@df/multichannel-app-shared/content/assets/font-awesome/twitter-brands.svg";

// UI icons
import chevronRightSolidSrc from "@df/multichannel-app-shared/content/assets/font-awesome/chevron-right-solid.svg";

// Interfaces
import { IconType } from "../interfaces/types";

// Helpers
const getIconSrc = (type: IconType) => {
  switch (type) {
    case "twitter":
      return twitterIconSrc;
    case "linkedin":
      return linkedinIconSrc;
    case "github":
      return githubIconSrc;
    case "npm":
      return npmIconSrc;
    case "chevronRightSolid":
      return chevronRightSolidSrc;
    default:
      return "";
  }
};

export default getIconSrc;
