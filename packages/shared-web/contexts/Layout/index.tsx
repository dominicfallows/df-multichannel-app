import { debounce } from "lodash";
import * as React from "react";

import { LayoutBreakpoint } from "./interfaces/breakpoint";
import { LayoutContext, LayoutContextInjectedProps } from "./interfaces/context";

/**
 * Helpers
 */
const getBreakpoint = (): LayoutBreakpoint => {
  if (typeof window !== "undefined") {
    if (window.innerWidth >= 1440) {
      return "xl";
    } else if (window.innerWidth >= 1200) {
      return "lg";
    } else if (window.innerWidth >= 640) {
      return "md";
    }
  }
  return "sm";
};

/**
 * Non-exported Context
 */
const Context = React.createContext({
  breakpoint: getBreakpoint(),
  previousBreakpoint: getBreakpoint(),
  breakpointChanged: false
});

/**
 * Export Consumer
 */
export const Consumer = Context.Consumer;

/**
 * Export Consumer HOC creator
 */
export const withLayout = <P extends object>() => (Component: React.ComponentType<P & LayoutContextInjectedProps>) =>
  class WithLayout extends React.Component<P> {
    render() {
      return <Context.Consumer>{layout => <Component {...this.props} layout={layout} />}</Context.Consumer>;
    }
  };

/**
 * Export Provider
 */
export class Provider extends React.Component<{}, LayoutContext> {
  resizeDebounce: () => void;

  constructor(props: {}) {
    super(props);

    const breakpointOnLoad = getBreakpoint();

    this.state = {
      breakpoint: breakpointOnLoad,
      previousBreakpoint: breakpointOnLoad,
      breakpointChanged: false
    };

    this.resizeDebounce = debounce(() => {
      const nextBreakpoint = getBreakpoint();

      this.setState({
        breakpoint: nextBreakpoint,
        previousBreakpoint: this.state.breakpoint,
        breakpointChanged: nextBreakpoint !== this.state.breakpoint
      });
    }, 150);
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", this.resizeDebounce, false);
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.resizeDebounce, false);
    }
  }

  render() {
    return <Context.Provider value={this.state}>{this.props.children}</Context.Provider>;
  }
}

const Layout = {
  Consumer,
  Provider
};

export default Layout;
