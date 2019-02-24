import * as React from "react";

const MdxHorizontalScrollComponent = ({ children, ...props }) => {
  return (
    <div
      style={{
        maxWidth: "100%",
        overflowY: "scroll",
        marginBottom: "1.5rem",
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default MdxHorizontalScrollComponent;
