import { graphql, StaticQuery } from "gatsby";
import Image from "gatsby-image";
import * as React from "react";

import Link from "@df/multichannel-app-shared-web/components/Link";
import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";
import { gridContainerStyles } from "@df/multichannel-app-shared-web/styles/grid";
import { colors } from "@df/multichannel-app-shared/styles/colors";
import { linearGradientCssString } from "@df/multichannel-app-shared/styles/gradients";

import IconLink from "@df/multichannel-app-shared-web/components/Icon/IconLink";
import { IconType } from "@df/multichannel-app-shared-web/components/Icon/interfaces/types";

import IILink from "../Links/ii";
import MOMWLink from "../Links/mo+mw";

export interface BioProps {
  isHome?: boolean;
}

export interface BioState {
  moreOpen: boolean;
}

class Bio extends React.Component<BioProps, BioState> {
  constructor(props: BioProps) {
    super(props);

    this.state = {
      moreOpen: false,
    };
  }

  toggleMore = () => {
    this.setState({
      moreOpen: !this.state.moreOpen,
    });
  }

  render() {
    const { moreOpen } = this.state;

    return (
      <StaticQuery
        query={bioQuery}
        render={(data) => {
          const { author, social } = data.site.siteMetadata;
          return (
            <LayoutContextConsumer>
              {({ breakpoint }) => (
                <div
                  style={{
                    ...gridContainerStyles,
                    display: `flex`,
                    marginBottom: "1rem",
                  }}
                >
                  <Image
                    fixed={data.avatar.childImageSharp.fixed}
                    alt={author}
                    style={{
                      borderRadius: `100%`,
                      marginBottom: 0,
                      marginRight: "1rem",
                      minWidth: 50,
                    }}
                  />
                  <div>
                    {this.props.isHome === true && (
                      <h1
                        style={{
                          fontSize: breakpoint === "sm" ? "1.4rem" : undefined,
                        }}
                      >
                        Dominic Fallows <br />
                        <span
                          style={{
                            fontWeight: 400,
                            fontSize: breakpoint === "sm" ? "0.75em" : "0.65em",
                            lineHeight: 1.2,
                            display: "inline-block",
                          }}
                        >
                          Technical Lead and Senior Developer for{" "}
                          <span
                            style={{
                              background: linearGradientCssString,
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                            }}
                          >
                            web, mobile and cloud apps
                          </span>
                        </span>
                      </h1>
                    )}

                    <div
                      style={{
                        fontSize: "0.9em",
                      }}
                    >
                      <p>
                        Hi, I'm Dominic, a Technical Lead and Senior Developer for web,{" "}
                        mobile and cloud apps. I'm a seasoned developer, leader and{" "}
                        life-long enthusiast of technology, software engineering and{" "}
                        business. I have been working in technology and business for{" "}
                        over 16 years and have a proven track record in using latest{" "}
                        technologies to develop and deliver web, mobile and cloud solutions.
                      </p>
                      <p>
                        I'm currently Technical Lead for web, mobile and content apps and{" "}
                        teams at <IILink />, <MOMWLink />.
                      </p>
                      <p>
                        Read more {" "}
                        <Link
                          to="/about"
                          title="About Dominic Fallows"
                          type="primary"
                        >
                          About me
                        </Link> and find out more about my{" "}
                        <Link
                          to="/projects"
                          title="Dominic Fallows' Projects"
                          type="primary"
                        >
                          Projects
                        </Link>
                        .
                      </p>
                    </div>

                    <p>
                      {social.map(
                        (
                          s: {
                            name: string;
                            profile: string;
                            url: string;
                          },
                          i: number,
                        ) => (
                          <React.Fragment key={i}>
                            <IconLink
                              href={s.url}
                              title={`${s.name} @${s.profile}`}
                              icon={s.name.toLowerCase() as IconType}
                              style={{
                                marginRight: "5px",
                              }}
                            />
                            {i + 1 < social.length ? " " : ""}
                          </React.Fragment>
                        ),
                      )}
                    </p>
                  </div>
                </div>
              )}
            </LayoutContextConsumer>
          );
        }}
      />
    );
  }
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          name
          profile
          url
        }
      }
    }
  }
`;

export default Bio;
