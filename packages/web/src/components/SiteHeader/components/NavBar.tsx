import { WindowLocation } from "@reach/router";
import React, { useContext } from "react";

import Link from "@df/multichannel-app-shared-web/components/Link";
import { Context as LayoutContext } from "@df/multichannel-app-shared-web/contexts/Layout";

import aboutIconActive from "@df/multichannel-app-shared/content/assets/about-icon-active.svg";
import aboutIcon from "@df/multichannel-app-shared/content/assets/about-icon.svg";
import blogIconActive from "@df/multichannel-app-shared/content/assets/blog-icon-active.svg";
import blogIcon from "@df/multichannel-app-shared/content/assets/blog-icon.svg";
import projectsIconActive from "@df/multichannel-app-shared/content/assets/projects-icon-active.svg";
import projectsIcon from "@df/multichannel-app-shared/content/assets/projects-icon.svg";
import { colors } from "@df/multichannel-app-shared/styles/colors";

const NavBar = ({ location }: { location?: WindowLocation }) => {
  const { breakpoint } = useContext(LayoutContext);

  if (breakpoint !== "sm") {
    return null;
  }

  return (
    <div
      id="SiteHeaderNavBar"
      style={{
        textAlign: "center",
        background: colors.grey1,
        borderTop: `1px solid ${colors.grey2}`,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "8px 8px 6px 8px",
        zIndex: 9999,
        display: breakpoint === "sm" ? "block" : "hidden",
      }}
    >
      <ul
        style={{
          listStyleType: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NavBarItem
          to="/"
          title="Blog"
          label="Blog"
          icon={blogIcon}
          iconActive={blogIconActive}
          active={
            location &&
            (location.pathname.startsWith("/blog") || location.pathname === "/")
          }
        />
        <NavBarItem
          to="/about"
          title="About Dominic Fallows"
          label="About"
          icon={aboutIcon}
          iconActive={aboutIconActive}
          active={location && location.pathname.startsWith("/about")}
        />
        <NavBarItem
          to="/projects"
          title="Projects"
          label="Projects"
          icon={projectsIcon}
          iconActive={projectsIconActive}
          active={location && location.pathname.startsWith("/projects")}
        />
      </ul>
    </div>
  );
};

const NavBarItem = (props: {
  to: string;
  title: string;
  label: string;
  icon: string;
  iconActive: string;
  active: boolean;
}) => (
  <li
    style={{
      marginLeft: "1.5rem",
      marginRight: "1.5rem",
      marginTop: 0,
      marginBottom: 0,
    }}
  >
    <Link
      to={props.to}
      title={props.title}
      type={"grey"}
      style={{
        fontSize: "0.8em",
        borderBottomColor: "transparent",
        color: props.active ? colors.blue : colors.grey3,
        textAlign: "center",
        borderBottom: "none",
        padding: 0,
        display: "block",
        lineHeight: 1,
      }}
      activeStyle={{
        color: colors.blue,
      }}
    >
      <img
        src={props.active ? props.iconActive : props.icon}
        alt={props.title}
        style={{
          display: "block",
          width: "20px",
          height: "18px",
          padding: 0,
          margin: "0 auto 6px auto",
        }}
      />
      {props.label}
    </Link>
  </li>
);

export default NavBar;
