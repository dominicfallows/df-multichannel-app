import * as React from "react";

import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";

import Link from "@df/multichannel-app-shared-web/components/Link";
import { gridContainerStyles } from "@df/multichannel-app-shared-web/styles/grid";
import { colors } from "@df/multichannel-app-shared/styles/colors";

const SiteFooter = () => (
  <LayoutContextConsumer>
    {({ breakpoint }) => (
      <footer
        role="contentinfo"
        style={{
          fontSize: "0.9em",
          marginTop: "1rem",
          color: colors.grey4,
          textAlign: "center",
          // larger than small
          ...(breakpoint !== "sm"
            ? {
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                textAlign: "left",
                position: "absolute",
                right: 0,
                bottom: 0,
                left: 0,
                height: "50px",
              }
            : {}),
        }}
      >
        <div style={{ ...gridContainerStyles, flexGrow: 1 }}>
          Copyright &copy; Dominic Fallows 2018-2020.{" "}
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
