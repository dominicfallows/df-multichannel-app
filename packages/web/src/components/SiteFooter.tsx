import * as React from "react";

import Link from "@df/multichannel-app-shared-web/components/Link";

const SiteFooter = () => (
  <footer
    role="contentinfo"
    style={{
      fontSize: `0.85rem`,
      marginTop: `4rem`,
    }}
  >
    Copyright &copy; Dominic Fallows 2018-2019.{" "}
    <Link to="/legals" title="Legals" type="primary">
      The legal stuff
    </Link>
    . Built with{" "}
    <Link to="https://www.gatsbyjs.org" title="GatsbyJS" target="_blank" type="primary">
      Gatsby
    </Link>
    .
  </footer>
);

export default SiteFooter;
