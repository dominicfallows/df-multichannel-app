import * as React from "react";

import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";

import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export interface LayoutProps {
  location: {
    pathname: string;
  };
}

class Layout extends React.Component<LayoutProps> {
  render() {
    const { children } = this.props;

    console.log({
      NODE_ENV: process.env.NODE_ENV,
      TEST: process.env.TEST,
      GATSBY_TEST: process.env.GATSBY_TEST,
    });

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

export default Layout;
