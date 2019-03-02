import { WindowLocation } from "@reach/router";
import React, { useContext } from "react";

import Icon from "@df/multichannel-app-shared-web/components/Icon";
import Link from "@df/multichannel-app-shared-web/components/Link";
import { Context as LayoutContext } from "@df/multichannel-app-shared-web/contexts/Layout";
import { colors } from "@df/multichannel-app-shared/styles/colors";

const NavList = ({
  siteHeaderHeight,
  location,
}: {
  siteHeaderHeight: string;
  location?: WindowLocation;
}) => {
  const { breakpoint } = useContext(LayoutContext);

  return (
    <div
      id="SiteHeaderNavList"
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
          height: siteHeaderHeight,
        }}
      >
        {breakpoint === "sm" && location && location.pathname === "/" && (
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
              active={location && location.pathname.startsWith("/blog/")}
            />
            <NavListItem
              to="/about"
              title="About Dominic Fallows"
              label="About"
            />
            <NavListItem to="/projects" title="Projects" label="Projects" />
          </>
        )}
      </ul>
    </div>
  );
};

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

export default NavList;
