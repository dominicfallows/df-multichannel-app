import * as React from "react";

import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";

import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export interface SiteLayoutProps {
  location: {
    pathname: string;
  };
}

class SiteLayout extends React.Component<SiteLayoutProps> {
  render() {
    const { children } = this.props;

    return (
      <LayoutContextConsumer>
        {({ breakpoint }) => (
          <div
            style={{
              minHeight: "100vh",
              position: "relative",
              paddingBottom: breakpoint === "sm" ? "4rem" : "50px",
            }}
          >
            <SiteHeader />
            <main role="main">{children}</main>
            <SiteFooter />
          </div>
        )}
      </LayoutContextConsumer>
    );
  }
}

export default SiteLayout;
