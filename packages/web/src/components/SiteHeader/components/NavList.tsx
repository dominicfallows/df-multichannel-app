import { Location } from "@reach/router";
import * as React from "react";

import Icon from "@df/multichannel-app-shared-web/components/Icon";
import Link from "@df/multichannel-app-shared-web/components/Link";
import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";
import { colors } from "@df/multichannel-app-shared/styles/colors";

const NavListItem = (props: {
  to: string;
  title: string;
  label: string | JSX.Element;
  active?: boolean;
}) => {
  const activeStyle = {
    color: colors.grey6,
    background: "rgba(255, 255, 255, 0.5)",
    textDecoration: "none",
  };

  return (
    <li
      style={{
        margin: 0,
        padding: 0,
        height: "100%",
      }}
    >
      <Link
        to={props.to}
        title={props.title}
        type={"white"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          padding: "0 0.75rem",
          height: "100%",
          fontSize: "1em",
          ...(props.active ? activeStyle : {}),
        }}
        activeStyle={activeStyle}
      >
        <span>{props.label}</span>
      </Link>
    </li>
  );
};

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
                alignItems: "center",
                justifyContent: "right",
                height: props.siteHeaderHeight,
              }}
            >
              {breakpoint === "sm" && location.pathname === "/" && (
                <NavListItem
                  to="/#blog"
                  title="Skip to blog"
                  label={
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        alignSelf: "center",
                        paddingTop: "3px",
                      }}
                    >
                      <Icon
                        icon="arrowDownSolid"
                        title=""
                        style={{
                          opacity: 0.3,
                          height: "1rem",
                          width: "1rem",
                          marginRight: "0.25rem",
                        }}
                      />
                      Skip to blog
                    </span>
                  }
                />
              )}
              {breakpoint !== "sm" && (
                <>
                  <NavListItem
                    to="/"
                    title="Blog"
                    label="Blog"
                    active={location.pathname.startsWith("/blog/")}
                  />
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
