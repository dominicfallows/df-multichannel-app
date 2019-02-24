import { Location } from "@reach/router";
import * as React from "react";

import Link from "@df/multichannel-app-shared-web/components/Link";
import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";
import { colors } from "@df/multichannel-app-shared/styles/colors";

const NavListItem = (props: { to: string; title: string; label: string }) => (
  <li
    style={{
      margin: 0,
      padding: 0,
    }}
  >
    <Link
      to={props.to}
      title={props.title}
      type={"white"}
      style={{
        display: "inline-block",
        padding: "0.3rem 1rem",
        borderTopLeftRadius: "3px",
        borderTopRightRadius: "3px",
      }}
      activeStyle={{
        color: colors.greySlate,
        background: colors.white,
        textDecoration: "none",
      }}
    >
      {props.label}
    </Link>
  </li>
);

const NavList = (props: { siteHeaderHeight: string }) => (
  <LayoutContextConsumer>
    {({ breakpoint }) => (
      <Location>
        {({ location }) => (
          <nav
            role="navigation"
            style={{
              flexGrow: 1,
              textAlign: "right",
            }}
          >
            <ul
              style={{
                listStyleType: "none",
                margin: 0,
                padding: 0,
                display: "inline-flex",
                alignItems: breakpoint === "sm" ? "center" : "flex-end",
                justifyContent: "right",
                height: props.siteHeaderHeight,
              }}
            >
              {breakpoint === "sm" && location.pathname === "/" && (
                <NavListItem
                  to="/#blog"
                  title="Skip to blog"
                  label="Skip to blog"
                />
              )}
              {breakpoint !== "sm" && (
                <>
                  <NavListItem to="/" title="Blog" label="Blog" />
                  <NavListItem
                    to="/about"
                    title="About Dominic Fallows"
                    label="About"
                  />
                  <NavListItem
                    to="/projects"
                    title="Projects"
                    label="Projects"
                  />
                </>
              )}
            </ul>
          </nav>
        )}
      </Location>
    )}
  </LayoutContextConsumer>
);

export default NavList;
