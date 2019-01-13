import { Location } from "@reach/router";
import * as React from "react";

import Link from "@df/multichannel-app-shared-web/components/Link";
import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";
import { grid } from "@df/multichannel-app-shared-web/styles/grid";
import { rhythm } from "@df/multichannel-app-shared-web/styles/typography";

import aboutIconActive from "@df/multichannel-app-shared/content/assets/about-icon-active.svg";
import aboutIcon from "@df/multichannel-app-shared/content/assets/about-icon.svg";
import blogIconActive from "@df/multichannel-app-shared/content/assets/blog-icon-active.svg";
import blogIcon from "@df/multichannel-app-shared/content/assets/blog-icon.svg";
import projectsIconActive from "@df/multichannel-app-shared/content/assets/projects-icon-active.svg";
import projectsIcon from "@df/multichannel-app-shared/content/assets/projects-icon.svg";
import { colors } from "@df/multichannel-app-shared/styles/colors";
import { linearGradientBlockStyle } from "@df/multichannel-app-shared/styles/gradients";

import SiteTitle from "./SiteTitle";

const SiteHeader = () => (
  <LayoutContextConsumer>
    {({ breakpoint }) => {
      const getNavStyle = (): React.CSSProperties => {
        const style: React.CSSProperties = {
          zIndex: 9999,
          position: "relative",
        };

        if (breakpoint === "sm") {
          return {
            ...style,
            textAlign: "center",
            background: colors.grey1,
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0.5rem",
          };
        }

        return {
          ...style,
          flexGrow: 1,
          textAlign: "right",
        };
      };

      const NavListItem = (props: {
        to: string;
        title: string;
        label: string;
        icon: string;
        iconActive: string;
        active: boolean;
      }) => {
        console.log(props.to, props.active);
        return (
          <li
            style={{
              marginLeft: "1rem",
              marginRight: breakpoint === "sm" ? "1rem" : 0,
              marginTop: 0,
              marginBottom: 0,
            }}
          >
            <Link
              to={props.to}
              title={props.title}
              type={breakpoint === "sm" ? "grey" : "white"}
              style={
                breakpoint === "sm"
                  ? {
                      fontSize: "11px",
                      borderBottomColor: "transparent",
                      color: props.active ? colors.blue : colors.grey2,
                      textAlign: "center",
                      borderBottom: "none",
                      padding: 0,
                      display: "block",
                      lineHeight: 1,
                    }
                  : {}
              }
              activeStyle={breakpoint === "sm" ? { color: colors.blue } : {}}
            >
              {breakpoint === "sm" && (
                <img
                  src={props.active ? props.iconActive : props.icon}
                  alt={props.title}
                  style={{
                    display: "block",
                    width: "22px",
                    height: "20px",
                    padding: 0,
                    margin: "0 auto 4px auto",
                  }}
                />
              )}
              {props.label}
            </Link>
          </li>
        );
      };

      return (
        <header
          role="banner"
          style={{
            ...linearGradientBlockStyle,
            marginBottom: "1rem",
          }}
        >
          <div style={{ ...grid.container }}>
            <div
              style={{
                display: breakpoint === "sm" ? "block" : "flex",
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

              <nav role="navigation" style={getNavStyle()}>
                <ul
                  style={{
                    listStyleType: "none",
                    margin: 0,
                    padding: 0,
                    display: breakpoint === "sm" ? "flex" : "inline-flex",
                    alignItems: "center",
                    justifyContent: breakpoint === "sm" ? "center" : "right",
                  }}
                >
                  <Location>
                    {({ location }) => (
                      <>
                        <NavListItem
                          to="/"
                          title="Blog"
                          label="Blog"
                          icon={blogIcon}
                          iconActive={blogIconActive}
                          active={
                            location.pathname.startsWith("/blog") ||
                            location.pathname === "/"
                          }
                        />
                        <NavListItem
                          to="/about"
                          title="About Dominic Fallows"
                          label="About"
                          icon={aboutIcon}
                          iconActive={aboutIconActive}
                          active={location.pathname.startsWith("/about")}
                        />
                        <NavListItem
                          to="/projects"
                          title="Projects"
                          label="Projects"
                          icon={projectsIcon}
                          iconActive={projectsIconActive}
                          active={location.pathname.startsWith("/projects")}
                        />
                      </>
                    )}
                  </Location>
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
