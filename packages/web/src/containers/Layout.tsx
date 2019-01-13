import * as React from "react";

import { grid } from "@df/multichannel-app-shared-web/styles/grid";

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
        <SiteHeader location={location} />
        <main
          role="main"
          style={{
            ...grid.container,
          }}
        >
          {children}
        </main>
        <SiteFooter />
      </>
    );
  }
}

export default Layout;
