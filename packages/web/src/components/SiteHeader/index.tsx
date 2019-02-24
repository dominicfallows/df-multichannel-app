import * as React from "react";

import { gridContainerStyles } from "@df/multichannel-app-shared-web/styles/grid";

import { linearGradientBlockStyle } from "@df/multichannel-app-shared/styles/gradients";

import SiteTitle from "../SiteTitle";
import NavBar from "./components/NavBar";
import NavList from "./components/NavList";

const siteHeaderHeight = "46px";

const SiteHeader = () => (
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
        <SiteTitle />
      </div>

      <NavBar />
      <NavList siteHeaderHeight={siteHeaderHeight} />
    </div>
  </header>
);

export default SiteHeader;
