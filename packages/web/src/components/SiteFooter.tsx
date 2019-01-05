import { Link } from "gatsby";
import * as React from "react";

const SiteFooter = () => (
  <footer
    role="contentinfo"
    style={{
      fontSize: `0.85rem`,
      marginTop: `4rem`,
    }}
  >
    Copyright &copy; Dominic Fallows 2018-2019.{" "}
    <Link to="/legals" title="Legals">
      The legal stuff
    </Link>
    . Built with{" "}
    <Link to="https://www.gatsbyjs.org" title="GatsbyJS" target="_blank">
      Gatsby
    </Link>
    .
  </footer>
);

export default SiteFooter;
