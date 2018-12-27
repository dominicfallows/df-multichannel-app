import Typography from "typography";
import GitHubTheme from "typography-theme-github";

GitHubTheme.overrideThemeStyles = () => {
  return {};
};

// delete GitHub.googleFonts

const typography = new Typography(GitHubTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;