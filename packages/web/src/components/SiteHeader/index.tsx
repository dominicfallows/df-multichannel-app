import { Location } from "@reach/router";
import React, { useContext } from "react";

import { Context as LayoutContext } from "@df/multichannel-app-shared-web/contexts/Layout";

import { gridContainerStyles } from "@df/multichannel-app-shared-web/styles/grid";

import { linearGradientBlockStyle } from "@df/multichannel-app-shared/styles/gradients";

import SiteTitle from "../SiteTitle";
import NavBar from "./components/NavBar";
import NavList from "./components/NavList";

const siteHeaderHeight = "46px";

const SiteHeader = () => {
  const { breakpoint } = useContext(LayoutContext);

  return (
    <Location>
      {({ location }) => (
        <header
          role="banner"
          style={{
            ...linearGradientBlockStyle,
            marginBottom: "1.5rem",
            position: "relative",
            zIndex: 9999,
            height: siteHeaderHeight,
          }}
        >
          <div
            style={{
              ...gridContainerStyles,
              height: siteHeaderHeight,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                flexShrink: 1,
                marginLeft: "-1rem",
              }}
            >
              <SiteTitle location={location} />
            </div>

            <nav
              role="navigation"
              style={{
                flexGrow: 1,
                textAlign: breakpoint !== "sm" ? "right" : undefined,
              }}
            >
              <NavBar location={location} />
              <NavList
                location={location}
                siteHeaderHeight={siteHeaderHeight}
              />
            </nav>
          </div>
        </header>
      )}
    </Location>
  );
};

export default SiteHeader;
