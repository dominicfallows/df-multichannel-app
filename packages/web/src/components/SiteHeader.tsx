import * as React from "react";

import Link from "@df/multichannel-app-shared-web/components/Link";
import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";
import { grid } from "@df/multichannel-app-shared-web/styles/grid";
import { rhythm } from "@df/multichannel-app-shared-web/styles/typography";
import { colors } from "@df/multichannel-app-shared/styles/colors";
import { linearGradientBlockStyle } from "@df/multichannel-app-shared/styles/gradients";

import SiteTitle from "./SiteTitle";

const SiteHeader = () => (
  <LayoutContextConsumer>
    {({ breakpoint }) => {
      const getNavStyle = (): React.CSSProperties => {
        if (breakpoint === "sm") {
          return {
            textAlign: "center",
            background:  colors.blue,
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0
          };
        }

        return {
          flexGrow: 1,
          textAlign: "right"
        };
      };

      const navListItemStyle: React.CSSProperties = {
        marginLeft: breakpoint === "sm" ? "0.5rem" : "1rem",
        marginRight: breakpoint === "sm" ? "0.5rem" : 0,
        marginTop: 0,
        marginBottom: 0
      };

      return (
        <header
          role="banner"
          style={{
            ...linearGradientBlockStyle,
            marginBottom: "1rem"
          }}
        >
          <div style={{ ...grid.container }}>

            <div style={{
              display: breakpoint === "sm" ? "block" : "flex",
              alignItems: breakpoint === "sm" ? undefined : "center"
            }}>

              <div style={{
                flexShrink: breakpoint === "sm" ? undefined : 1,
                marginLeft: "-1rem"
              }}>
                <SiteTitle />
              </div>

              <nav role="navigation" style={getNavStyle()}>
                <ul style={{
                  listStyleType: "none",
                  margin: 0,
                  padding: 0,
                  display: breakpoint === "sm" ? "flex" : "inline-flex",
                  alignItems: "center",
                  justifyContent: breakpoint === "sm" ? "center" : "right"
                }}>
                  <li style={navListItemStyle}>
                    <Link to="/" title="Blog" type="white">
                      Blog
                      </Link>
                  </li>
                  <li style={navListItemStyle}>
                    <Link to="/about" title="About Dominic Fallows" type="white">
                      About
                      </Link>
                  </li>
                  <li style={navListItemStyle}>
                    <Link to="/projects" title="Projects" type="white">
                      Projects
                      </Link>
                  </li>
                </ul>
              </nav>

            </div>
          </div>
        </header>

      );

    }}
  </LayoutContextConsumer>
);

export default SiteHeader;
