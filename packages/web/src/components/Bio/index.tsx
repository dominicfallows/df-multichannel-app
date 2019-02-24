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

class Bio extends React.Component<BioProps> {
  render() {
    const { isHome } = this.props;

    return (
      <StaticQuery
        query={bioQuery}
        render={data => {
          const { author, social } = data.site.siteMetadata;

          return (
            <LayoutContextConsumer>
              {({ breakpoint }) => {

                const readMoreAndSocialText = (
                  <>
                    <p
                      style={{
                        fontSize: "0.9em",
                      }}
                    >
                      Read more{" "}
                      <Link
                        to="/about"
                        title="About Dominic Fallows"
                        type="primary"
                      >
                        About me
                      </Link>{" "}
                      and find out more about my{" "}
                      <Link
                        to="/projects"
                        title="Dominic Fallows' Projects"
                        type="primary"
                      >
                        Projects
                      </Link>
                      .
                    </p>
                    <p
                      style={{
                        marginBottom: 0,
                      }}
                    >
                      {social.map(
                        (
                          s: {
                            name: string;
                            profile: string;
                            url: string;
                          },
                          i: number
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
                        )
                      )}
                    </p>
                  </>
                );

                const shortBioText = (
                  <>
                    <div
                      style={{
                        fontSize: "0.9em",
                      }}
                    >
                      <p style={{ fontWeight: 600 }}>
                        Hi, I'm Dominic, a Technical Lead and Senior Developer
                        for web, mobile and cloud apps.
                      </p>
                      <p>
                        I'm currently Technical Lead for web, mobile and
                        content apps and teams at{" "}
                        <IILink shortVersion={breakpoint === "sm"} />,{" "}
                        <MOMWLink shortVersion={breakpoint === "sm"} />.
                      </p>
                    </div>
                    {readMoreAndSocialText}
                  </>
                );

                const longBioText = (
                  <>
                    <div
                      style={{
                        fontSize: "0.9em",
                      }}
                    >
                      <p>
                        Hi, I'm Dominic, a Technical Lead and Senior Developer
                        for web, mobile and cloud apps. I'm a seasoned
                        developer, leader and life-long enthusiast of
                        technology, software engineering and business. I have
                        been working in technology and business for over 16
                        years and have a proven track record in using latest
                        technologies to develop and deliver web, mobile and
                        cloud solutions.
                      </p>
                      <p>
                        I'm currently Technical Lead for web, mobile and
                        content apps and teams at <IILink />, <MOMWLink />.
                      </p>
                    </div>
                    {readMoreAndSocialText}
                  </>
                );

                return (
                  <div
                    style={{
                      ...gridContainerStyles,
                    }}
                  >
                    <div style={{ display: !isHome && breakpoint === "sm" ? "display" : "flex" }}>
                      <Image
                        fixed={data.avatar.childImageSharp.fixed}
                        alt={author}
                        style={{
                          borderRadius: "3px",
                          marginBottom: "1rem",
                          marginRight: "1rem",
                          width: "60px",
                          height: "60px",
                          minWidth: "60px",
                        }}
                      />

                      <div>
                        {isHome && (
                          <h1
                            style={{
                              fontSize:
                                breakpoint === "sm" ? "1.4rem" : undefined,
                              lineHeight: 1,
                            }}
                          >
                            Dominic Fallows <br />
                            <span
                              style={{
                                fontWeight: 400,
                                fontSize:
                                  breakpoint === "sm" ? "0.75em" : "0.65em",
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
                        {!isHome && shortBioText}
                      </div>
                    </div>

                    {isHome && longBioText}
                  </div>
                )
            }}
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
        fixed(width: 120, height: 120) {
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
