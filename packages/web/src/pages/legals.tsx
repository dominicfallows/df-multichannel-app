import * as React from "react";

import { grid } from "@df/multichannel-app-shared-web/styles/grid";

import SEO from "../components/SEO";
import Layout from "../containers/Layout";

export interface LegalsProps {
  location: {
    pathname: string;
  };
}

class Legals extends React.Component<LegalsProps> {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="Legals" meta={[{ name: "robots", content: "noindex" }]} />

        <div style={{ ...grid.container }}>
          <h1>Legals</h1>

          <p>
            Unless otherwise stated, all content (text, images, graphics, logos,
            audio, video and other content is Copyright &copy; 2018 Dominic
          Fallows and licensed under the{" "}
            <a
              rel="nofollow,license"
              href="http://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
            >
              Creative Commons Attribution-ShareAlike 4.0 International License
          </a>
            .
        </p>

          <p>
            The software in this project is Copyright &copy; 2018 Dominic Fallows{" "}
            and made available under the{" "}
            <a
              rel="nofollow,license"
              href="https://opensource.org/licenses/MIT"
              target="_blank"
            >
              MIT license
          </a>
            .
        </p>

          <p>
            The webfonts are Copyright &copy; 1990-2018 MyFonts Inc. All rights{" "}
            reserved.{" "}
            <a
              rel="nofollow,license"
              href="https://www.myfonts.com/viewlicense?type=web&buildid=3694157"
              target="_blank"
            >
              Licensed
          </a>{" "}
            to Dominic Fallows.
        </p>

          <p>
            The icons for Twitter, LinkedIn, NPM and GitHub are licensed by Font Awesome{" "}
            under the{" "}
            <a
              rel="nofollow,license"
              href="https://fontawesome.com/license/free"
              target="_blank"
            >
              Font Awesome Free License (Icons — CC BY 4.0 License)
          </a>
          </p>
        </div>
      </Layout>
    );
  }
}

export default Legals;
