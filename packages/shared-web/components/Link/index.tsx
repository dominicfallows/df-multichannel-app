import { Link as GatsbyLink } from "gatsby";
import * as React from "react";

import { linkStyle, linkStyleHover } from "../../styles/links";

import { LinkProps } from "./interfaces/props";
import { LinkState } from "./interfaces/state";

class Link extends React.Component<LinkProps, LinkState> {
  constructor(props: LinkProps) {
    super(props);

    this.state = {
      hover: false
    };
  }

  mouseOut() {
    this.setState({ hover: false });
  }

  mouseOver() {
    this.setState({ hover: true });
  }

  render() {
    const { activeStyle, children, rel, style, target, title, to, type } = this.props;
    const { hover } = this.state;

    return (
      <GatsbyLink
        to={to}
        target={target}
        title={title}
        onMouseOut={() => this.mouseOut()}
        onMouseOver={() => this.mouseOver()}
        style={{
          ...linkStyle(type),
          ...(hover ? linkStyleHover(type) : {}),
          ...style
        }}
        activeStyle={activeStyle}
        rel={rel}
      >
        {children}
      </GatsbyLink>
    );
  }
}

export default Link;
