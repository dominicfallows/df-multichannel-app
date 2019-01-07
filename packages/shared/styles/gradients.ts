import { colors } from "./colors";

export const linearGradientCssString = `linear-gradient(225deg, ${colors.blue}, ${colors.green}, ${
  colors.greenLight
}, ${colors.green}, ${colors.blue})`;

export const linearGradientBlockStyle = {
  backgroundColor: colors.blue,
  background: linearGradientCssString
};

export const linearGradientBlock1remStyle = {
  ...linearGradientBlockStyle,
  height: "1rem"
};
