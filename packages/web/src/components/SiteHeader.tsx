import { Link } from "gatsby";
import * as React from "react";

import SiteTitle from "./SiteTitle";

export interface SiteHeaderProps {
  location: {
    pathname: string;
  };
}

const SiteHeader = (props: SiteHeaderProps) => {
  const { location } = props;

  return (
    <header role="banner">
      <SiteTitle location={location} />

      <nav role="navigation">
        <Link to="/" title="Blog">Blog</Link>
        <Link to="/projects">Projects</Link>
      </nav>
    </header>
  );
};

export default SiteHeader;
