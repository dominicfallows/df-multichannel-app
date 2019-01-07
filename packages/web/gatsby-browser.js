import * as React from "react";
import WebFontLoader from "webfontloader";

import { Provider as LayoutContextProvider } from "@df/multichannel-app-shared-web/contexts/Layout";

export const onInitialClientRender = (a, options) => {
  WebFontLoader.load({
    custom: {
      families: ["Swiss721"],
      urls: [
        "/static/webfonts/Swiss721-licensed-to-Dominic-Fallows_unhinted.css",
      ],
    },
  });
};

export const wrapRootElement = ({ element }) => (
  <LayoutContextProvider>{element}</LayoutContextProvider>
);
