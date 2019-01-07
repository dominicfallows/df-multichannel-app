import { LayoutBreakpoint } from "./breakpoint";

export interface LayoutContext {
  breakpoint: LayoutBreakpoint;
  previousBreakpoint: LayoutBreakpoint;
  breakpointChanged: boolean;
}

export interface LayoutContextInjectedProps {
  layout: LayoutContext;
}