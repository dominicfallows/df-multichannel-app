import * as React from "react";

import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";

import Link from "@df/multichannel-app-shared-web/components/Link";
import { grid } from "@df/multichannel-app-shared-web/styles/grid";
import { colors } from "@df/multichannel-app-shared/styles/colors";

const SiteFooter = () => (
  <LayoutContextConsumer>
    {({ breakpoint }) => (
      <footer
        role="contentinfo"
        style={{
          fontSize: "12px",
          marginTop: "4rem",
          marginBottom: breakpoint === "sm" ? "4rem" : "1rem",
          color: colors.grey3,
          textAlign: breakpoint === "sm" ? "center" : "left",
        }}
      >
        <div style={{ ...grid.container }}>
          Copyright &copy; Dominic Fallows 2018-2019.{" "}
          <Link to="/legals" title="Legals" type="primary">
            The legal stuff
          </Link>
          . Built with{" "}
          <Link
            to="https://www.gatsbyjs.org"
            title="GatsbyJS"
            target="_blank"
            type="primary"
          >
            Gatsby
          </Link>
          .
        </div>
      </footer>
    )}
  </LayoutContextConsumer>
);

export default SiteFooter;
