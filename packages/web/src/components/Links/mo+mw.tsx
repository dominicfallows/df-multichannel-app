import * as React from "react";

import MOLink from "./mo";
import MWLink from "./mw";

export const MOMWLink = (props: { shortVersion?: boolean }) => (
  <>
    <MOLink /> and <MWLink />
    {!props.shortVersion && (
      <>
        , two of the UK's leading digital and print{" "}
        personal finance and investment magazines
      </>
    )}
  </>
);

export default MOMWLink;
