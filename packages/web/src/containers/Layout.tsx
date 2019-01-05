import * as React from "react";

import { linearGradientBlock1remStyle } from "@df/multichannel-app-shared/styles/gradients";
import { rhythm } from "@df/multichannel-app-shared/styles/typography-web";

import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export interface LayoutProps {
  location: {
    pathname: string;
  };
}

class Layout extends React.Component<LayoutProps> {
  render() {
    const { location, children } = this.props;

    return (
      <>
        <div
          style={{
            ...linearGradientBlock1remStyle,
          }}
        />
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: `800px`,
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          <SiteHeader location={location} />
          <main role="main">{children}</main>
          <SiteFooter />
        </div>
      </>
    );
  }
}

export default Layout;
