import * as React from "react";

import MdxHorizontalScrollComponent from "./MdxHorizontalScrollComponent";

const MdxTableComponent = ({ children, ...props }) => {
  return (
    <MdxHorizontalScrollComponent {...props}>
      <table
        style={{
          minWidth: "500px",
          fontSize: "0.9em",
          marginBottom: "1rem",
        }}
      >
        {children}
      </table>
    </MdxHorizontalScrollComponent>
  );
};

export default MdxTableComponent;
