import { colors } from "./colors";

export const tagStyle = {
  color: colors.white,
  backgroundColor: colors.green,
  display: "inline-block",
  fontSize: "12px",
  padding: "2px 4px",
  fontWeight: 400,
  borderRadius: "3px",
};

export const tagNonClickStyle = {
  ...tagStyle,
  backgroundColor: colors.grey2,
};

export const tagStyleHover = {
  backgroundColor: colors.greenLight,
  textDecoration: "none",
};
