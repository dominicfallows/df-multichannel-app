import { colors } from "./colors";

export const linearGradientCssString = `linear-gradient(225deg, ${colors.blue}, ${colors.green}, ${colors.greenLight}, ${colors.green}, ${colors.blue})`;

export const linearGradientBlock1remStyle = {
  height: "1rem",
  backgroundColor: colors.blue,
  background: linearGradientCssString,
};
