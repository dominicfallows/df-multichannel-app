import { graphql, StaticQuery } from "gatsby";
import Image from "gatsby-image";
import * as React from "react";

import Link from "@df/multichannel-app-shared-web/components/Link";
import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";
import { gridContainerStyles } from "@df/multichannel-app-shared-web/styles/grid";
import { colors } from "@df/multichannel-app-shared/styles/colors";
import { linearGradientCssString } from "@df/multichannel-app-shared/styles/gradients";

import IconLink, { IconLinkType } from "./components/IconLink";

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
                        Welcome, I’m Dominic. I have 18+ years experience in
                        developing and delivering web, mobile and cloud
                        applications using the latest technologies. I have a
                        lifelong passion for technology, software engineering
                        and business.{" "}
                        {!moreOpen && (
                          <span
                            style={{
                              color: colors.green,
                              cursor: "pointer",
                            }}
                            onClick={() => this.toggleMore()}
                          >
                            &#65291; More
                          </span>
                        )}
                      </p>

                      <div
                        style={{
                          maxHeight: moreOpen ? "none" : "0",
                          overflow: "hidden",
                        }}
                      >
                        <p>
                          I enjoy creating tools and experiences that make life
                          easier for people, teams and businesses. My goal is to{" "}
                          create well designed solutions and well crafted code,
                          based on industry standards and design patterns.
                        </p>

                        <p>
                          I'm an advocate for building happy and productive
                          teams, with a healthy work-life balance, through
                          better communication, improving processes and
                          keeping-things-simple, taking an agile approach to
                          projects.
                        </p>

                        <p>
                          Currently building teams and products based on
                          TypeScript, JavaScript, React, React Native, Node.js,
                          AWS and Azure. Find out more about my{" "}
                          <Link
                            to="/projects"
                            title="Dominic Fallows' Projects"
                            type="primary"
                          >
                            Projects
                          </Link>
                          .
                        </p>

                        <p>
                          Read more in{" "}
                          <Link
                            to="/about"
                            title="About Dominic Fallows"
                            type="primary"
                          >
                            About
                          </Link>
                          .
                        </p>

                        <p>
                          <span
                            style={{
                              color: colors.green,
                              cursor: "pointer",
                            }}
                            onClick={() => this.toggleMore()}
                          >
                            &#x2715; Close
                          </span>
                        </p>
                      </div>
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
                              icon={s.name.toLowerCase() as IconLinkType}
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
