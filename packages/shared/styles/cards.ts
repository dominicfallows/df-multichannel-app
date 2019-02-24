import { colors } from "./colors";

export const cardStyle = {
  backgroundColor: colors.white,
  borderRadius: "3px",
  color: colors.black,
  display: "block",
  padding: "1rem",
  boxShadow: "0 1px 1px 0 rgba(60,64,67,.08), 0 1px 3px 1px rgba(60,64,67,.16)",
  textDecoration: "none",
};

export const cardStyleHover = {
  backgroundColor: colors.grey1,
  boxShadow: "0 5px 5px 0 rgba(60,64,67,.1), 0 1px 3px 1px rgba(60,64,67,.2)",
  textDecoration: "none",
};
