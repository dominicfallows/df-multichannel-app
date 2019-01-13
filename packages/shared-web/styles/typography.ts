import Typography from "typography";

import { colors } from "@df/multichannel-app-shared/styles/colors";

const headFontStack = [
  "Swiss721",
  "-apple-system",
  "BlinkMacSystemFont",
  // "Segoe UI",
  "Helvetica",
  "Arial",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
];

const bodyFontStack = [
  "Swiss721",
  "-apple-system",
  "BlinkMacSystemFont",
  // "Segoe UI",
  "Helvetica",
  "Arial",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
];

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.4,
  scaleRatio: 2,
  headerFontFamily: headFontStack,
  headerWeight: "bold",
  bodyFontFamily: bodyFontStack,
  bodyWeight: "normal",
  includeNormalize: true,
  overrideStyles:  (props) => ({
    "a": {
      textDecoration: "none",
      color: colors.blue,
      outline: "none"
    },
    "a:hover": {
      color: colors.green
    },
    "h2, h3, h4": {
      marginBottom: props.rhythm(1),
      marginTop:0
    }
  })
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
