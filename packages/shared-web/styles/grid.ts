import * as React from "react";

export const gridContainerStyles: React.CSSProperties = {
  marginLeft: `auto`,
  marginRight: `auto`,
  maxWidth: `800px`,
  padding: `0 1rem`,
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

export const cardGridItem25Percent: React.CSSProperties = {
  flex: "0 1 calc(25% - 1rem)",
  margin: "0.5rem",
};

export const cardGridItem33Percent: React.CSSProperties = {
  flex: "0 1 calc(33% - 1rem)",
  margin: "0.5rem",
};

export const cardGridItem50Percent: React.CSSProperties = {
  flex: "0 1 calc(50% - 1rem)",
  margin: "0.5rem",
};

export const cardGridItem100Percent: React.CSSProperties = {
  flex: "0 1 calc(100% - 1rem)",
  margin: "0.5rem",
};
