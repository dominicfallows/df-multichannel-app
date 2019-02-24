import Highlight, { defaultProps } from "prism-react-renderer";
import vsDarkPlusTheme from "prism-react-renderer/themes/vsDarkPlus";
import * as React from "react";

const MdxCodeComponent = ({ children, ...props }) => {
  const regexp = /language-(\w*)/gi;

  let language: string | undefined;
  if (typeof props.className !== "undefined") {
    const matches = props.className.match(regexp);
    language =
      matches && matches.length > 0
        ? matches[0].replace("language-", "")
        : undefined;
  }

  return (
    <Highlight
      {...defaultProps}
      theme={vsDarkPlusTheme}
      code={children}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <code
          className={className}
          style={{
            ...style,
            padding: "1rem",
            borderRadius: "5px",
            fontSize: "0.9rem",
            lineHeight: "1.4rem",
            display: "block",
            overflow: "auto",
          }}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => {
                if (
                  tokens.length === i + 1 &&
                  line.length === key + 1 &&
                  token.empty
                ) {
                  // if we are on the last line of code, and the last token
                  // and the token is empty, don't render it
                  return null;
                }

                return <span key={key} {...getTokenProps({ token, key })} />;
              })}
            </div>
          ))}
        </code>
      )}
    </Highlight>
  );
};

export default MdxCodeComponent;
