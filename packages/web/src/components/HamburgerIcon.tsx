import * as React from "react";

import { colors } from "@df/multichannel-app-shared/styles/colors";

const HamburgerIcon = ({ open }: { open: boolean }) => {
  const styles: { [name: string]: React.CSSProperties } = {
    container: {
      width: "30px",
      height: "25px",
      position: "relative",
      transform: "rotate(0deg)",
      transition: ".5s ease-in-out",
      cursor: "pointer",
      border: "2.5px solid transparent",
      background: "transparent",
      outline: "none"
    },
    span: {
      display: "block",
      position: "absolute",
      height: "4px",
      width: "25px",
      background: colors.white,
      opacity: 1,
      left: 0,
      transform: "rotate(0deg)",
      transition: ".25s ease-in-out",
    },
    spanNth1: {
      top: 0,
    },
    spanNth2: {
      top: "8px",
    },
    spanNth3: {
      top: "8px",
    },
    spanNth4: {
      top: "16px",
    },
    spanNth1__open: {
      top: "8px",
      width: "0%",
      left: "50%",
    },
    spanNth2__open: {
      transform: "rotate(45deg)"
    },
    spanNth3__open: {
      transform: "rotate(-45deg)"
    },
    spanNth4__open: {
      top: "8px",
      width: "0%",
      left: "50%",
    }
  };

  return (
    <button style={styles.container}>
      <span
        style={{
          ...styles.span,
          ...styles.spanNth1,
          ...(open ? styles.spanNth1__open : {})
        }}
      />
      <span
        style={{
          ...styles.span,
          ...styles.spanNth2,
          ...(open ? styles.spanNth2__open : {})
        }}
      />
      <span
        style={{
          ...styles.span,
          ...styles.spanNth3,
          ...(open ? styles.spanNth3__open : {})
        }}
      />
      <span
        style={{
          ...styles.span,
          ...styles.spanNth4,
          ...(open ? styles.spanNth4__open : {})
        }}
      />
    </button>
  );
};

export default HamburgerIcon;
