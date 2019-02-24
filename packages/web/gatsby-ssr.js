import * as React from "react";

import { Provider as LayoutContextProvider } from "@df/multichannel-app-shared-web/contexts/Layout";

export const wrapRootElement = ({ element }) => (
  <LayoutContextProvider>{element}</LayoutContextProvider>
);