import { Link as GatsbyLink } from "gatsby";
import * as React from "react";

import { linkStyle, linkStyleHover } from "../../styles/links";

import { LinkProps } from "./interfaces/props";
import { LinkState } from "./interfaces/state";

class Link extends React.Component<LinkProps, LinkState> {
  constructor(props: LinkProps) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  mouseOut() {
    this.setState(
      { hover: false },
      () => {
        if (this.props.onMouseOut) {
          this.props.onMouseOut();
        }
      },
    );
  }

  mouseOver() {
    this.setState(
      { hover: true },
      () => {
        if (this.props.onMouseOver) {
          this.props.onMouseOver();
        }
      },
    );
  }

  isInternalLink = (url: string): boolean => {
    /**
     * Check if we're an internal link because the new Gatsby Link is intended
     * for internal links only, see:
     * https://www.gatsbyjs.org/docs/gatsby-link/?no-cache=1#use-link-only-for-internal-links
     */

    // url starts with a single `/`
    if (/^\/(?!\/)/.test(url)) {
      return true;
    }

    // Otherwise url might be a URL fragment or an external link
    return false;
  }

  render() {
    const { activeStyle, children, rel, style, target, title, to, type } = this.props;
    const { hover } = this.state;

    if (this.isInternalLink(to)) {
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
            ...style,
          }}
          activeStyle={activeStyle}
          rel={rel}
        >
          {children}
        </GatsbyLink>
      );
    } else {
      return (
        <a
          href={to}
          target={target}
          title={title}
          onMouseOut={() => this.mouseOut()}
          onMouseOver={() => this.mouseOver()}
          style={{
            ...linkStyle(type),
            ...(hover ? linkStyleHover(type) : {}),
            ...style,
          }}
          rel={rel}
        >
          {children}
        </a>
      );
    }
  }
}

export default Link;
