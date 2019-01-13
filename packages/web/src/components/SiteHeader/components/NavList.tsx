import { Location } from "@reach/router";
import * as React from "react";

import Link from "@df/multichannel-app-shared-web/components/Link";

const NavListItem = (props: { to: string; title: string; label: string }) => (
  <li
    style={{
      marginLeft: "1rem",
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
    }}
  >
    <Link to={props.to} title={props.title} type={"white"}>
      {props.label}
    </Link>
  </li>
);

const NavList = () => (
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
      }}
    >
      <Location>
        {({ location }) => (
          <>
            <NavListItem to="/" title="Blog" label="Blog" />
            <NavListItem
              to="/about"
              title="About Dominic Fallows"
              label="About"
            />
            <NavListItem to="/projects" title="Projects" label="Projects" />
          </>
        )}
      </Location>
    </ul>
  </nav>
);

export default NavList;
