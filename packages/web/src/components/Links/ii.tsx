import * as React from "react";

import Link from "@df/multichannel-app-shared-web/components/Link";

const IILink = (props: { shortVersion?: boolean }) => (
  <>
    <Link
      to="https://www.ii.co.uk"
      title="interactive investor is a low cost, award winning, online
investment platform enabling you to easily manage shares, funds,
SIPPs, ISAs and more...."
      target="_blank"
      type="secondary"
    >
      interactive investor
    </Link>
    {!props.shortVersion && (
      <>, a low cost, award winning, online investment platform</>
    )}
  </>
);

export default IILink;
