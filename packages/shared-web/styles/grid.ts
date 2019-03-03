import * as React from "react";

export const gridContainerStyles: React.CSSProperties = {
  marginLeft: `auto`,
  marginRight: `auto`,
  maxWidth: `820px`,
  padding: `0 1.5rem`,
};

export const cardGridContainerStyles = (breakpoint: string): React.CSSProperties => ({
  marginLeft: "-0.5rem",
  marginRight: "-0.5rem",
  ...(!breakpoint || breakpoint === "sm" ?
    {
      display: "block",
    } : {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "start",
    }
  ),
});

const cardGridItemBase: React.CSSProperties = {
  flex: "0 1 auto", // can't use calc() in flex with IE11
  margin: "0.5rem 0.5rem 1rem 0.5rem",
};

export const cardGridItem25Percent: React.CSSProperties = {
  ...cardGridItemBase,
  width: "calc(25% - 1rem)",
};

export const cardGridItem33Percent: React.CSSProperties = {
  ...cardGridItemBase,
  width: "calc(33% - 1rem)",
};

export const cardGridItem50Percent: React.CSSProperties = {
  ...cardGridItemBase,
  width: "calc(50% - 1rem)",
};

export const cardGridItem100Percent: React.CSSProperties = {
  ...cardGridItemBase,
  width: "calc(100% - 1rem)",
};
