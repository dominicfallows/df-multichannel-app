import * as React from "react";

import { cardStyle, cardStyleHover } from "@df/multichannel-app-shared/styles/cards";
import {
  cardGridItem100Percent,
  cardGridItem25Percent,
  cardGridItem33Percent,
  cardGridItem50Percent,
} from "../../styles/grid";

import Link from "../Link";

import { CardProps } from "./interfaces/props";
import { CardState } from "./interfaces/state";

class Card extends React.Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);

    this.state = {
      hover: false,
    };
  }

  mouseOut() {
    this.setState({ hover: false });
  }

  mouseOver() {
    this.setState({ hover: true });
  }

  render() {
    const { activeStyle, children, rel, style, target, title, to, width } = this.props;
    const { hover } = this.state;

    const cardWidthStyle = () => {
      switch (width) {
        case 25:
          return cardGridItem25Percent;
        case 33:
          return cardGridItem33Percent;
        case 50:
          return cardGridItem50Percent;
        case 100:
        default:
          return cardGridItem100Percent;
      }
    };

    return (
      <Link
        to={to}
        target={target}
        type="primary"
        title={title}
        onMouseOut={() => this.mouseOut()}
        onMouseOver={() => this.mouseOver()}
        style={{
          ...cardStyle,
          ...(hover ? cardStyleHover : {}),
          ...cardWidthStyle(),
          ...style,
        }}
        activeStyle={activeStyle}
        rel={rel}
      >
        {children}
      </Link>
    );
  }
}

export default Card;
