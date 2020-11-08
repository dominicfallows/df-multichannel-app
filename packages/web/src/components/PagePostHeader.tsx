import * as React from "react";

import SubNav from "@df/multichannel-app-shared-web/components/SubNav";
import { SubNavItem } from "@df/multichannel-app-shared-web/components/SubNav/interfaces/props";
import { articleTimeStr } from "@df/multichannel-app-shared/helpers/dates";
import { colors } from "@df/multichannel-app-shared/styles/colors";

const PagePostHeader = (props: {
  title: string;
  subNavItems?: SubNavItem[];
  standfirst?: string;
  created?: string;
  updated?: string;
}) => (
  <header
    style={{
      marginBottom: "2rem",
    }}
  >
    <h1>{props.title}</h1>

    {(props.created || props.updated) && (
      <time
        style={{
          fontSize: "0.85em",
          display: `block`,
          color: colors.grey4,
          margin: `1rem 0`,
        }}
        dateTime={props.created}
      >
        {articleTimeStr(props.created, props.updated)}
      </time>
    )}

    <SubNav
      items={props.subNavItems}
      style={{ minWidth: "260px", maxWidth: "360px" }}
    />

    {props.standfirst && (
      <div style={{ fontSize: "1.2em" }}>{props.standfirst}</div>
    )}
  </header>
);

export default PagePostHeader;
