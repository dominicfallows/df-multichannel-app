import * as React from "react";

import Link from "@df/multichannel-app-shared-web/components/Link";
import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";
import { grid } from "@df/multichannel-app-shared-web/styles/grid";
import { rhythm } from "@df/multichannel-app-shared-web/styles/typography";
import { linearGradientBlockStyle } from "@df/multichannel-app-shared/styles/gradients";

import HamburgerIcon from "./HamburgerIcon";
import SiteTitle from "./SiteTitle";

export interface SiteHeaderProps {
  location: {
    pathname: string;
  };
}

const SiteHeader = (props: SiteHeaderProps) => {
  const { location } = props;

  return (
    <header
      role="banner"
      style={{
        ...linearGradientBlockStyle,
        paddingTop: rhythm(1),
        paddingBottom: rhythm(1),
      }}
    >
      <div style={{ ...grid.container }}>
        <LayoutContextConsumer>
          {({ breakpoint }) => (
            <>
              {breakpoint === "sm" && <HamburgerIcon open={false} />}

              <SiteTitle location={location} />

              <nav role="navigation">
                <ul style={{
                  listStyleType: "none",
                  margin: 0,
                  padding: 0
                }}>
                  <li>
                    <Link to="/" title="Blog" type="white">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" title="About Dominic Fallows" type="white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/projects" title="Projects" type="white">
                      Projects
                    </Link>
                  </li>
                </ul>
              </nav>
            </>
          )}
        </LayoutContextConsumer>
      </div>
    </header>
  );
};

export default SiteHeader;
