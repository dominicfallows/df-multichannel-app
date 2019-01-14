import * as React from "react";

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

    return (
      <>
        <SiteHeader />
        <main role="main">
          {children}
        </main>
        <SiteFooter />
      </>
    );
  }
}

export default Layout;
