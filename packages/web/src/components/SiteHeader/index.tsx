import * as React from "react";

import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";
import { grid } from "@df/multichannel-app-shared-web/styles/grid";

import { linearGradientBlockStyle } from "@df/multichannel-app-shared/styles/gradients";

import SiteTitle from "../SiteTitle";
import NavBar from "./components/NavBar";
import NavList from "./components/NavList";

const SiteHeader = () => (
  <LayoutContextConsumer>
    {({ breakpoint }) => (
      <header
        role="banner"
        style={{
          ...linearGradientBlockStyle,
          marginBottom: "1.5rem",
          position: "relative",
          zIndex: 9999,
        }}
      >
        <div style={{ ...grid.container }}>
          <div
            style={{
              display: breakpoint === "sm" ? "inline-block" : "flex",
              alignItems: breakpoint === "sm" ? undefined : "center",
            }}
          >
            <div
              style={{
                flexShrink: breakpoint === "sm" ? undefined : 1,
                marginLeft: "-1rem",
              }}
            >
              <SiteTitle />
            </div>

            {breakpoint === "sm" && <NavBar />}
            {breakpoint !== "sm" && <NavList />}
          </div>
        </div>
      </header>
    )}
  </LayoutContextConsumer>
);

export default SiteHeader;
