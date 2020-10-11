import { graphql } from "gatsby";
import { has } from "lodash";
import moment from "moment";
import * as React from "react";

import Card from "@df/multichannel-app-shared-web/components/Card";
import Icon from "@df/multichannel-app-shared-web/components/Icon";
import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";
import {
  cardGridContainerStyles,
  gridContainerStyles,
} from "@df/multichannel-app-shared-web/styles/grid";
import { tagStyle } from "@df/multichannel-app-shared/styles/tags";

import IILink from "../components/Links/ii";
import SEO from "../components/SEO";
import SiteLayout from "../containers/SiteLayout";

export interface IGitHubPinnedRepo {
  name: string;
  updatedAt: string;
  createdAt: string;
  pushedAt: string;
  descriptionHTML: string;
  id: string;
  isFork: boolean;
  isPrivate: boolean;
  url: string;
}

export interface ProjectsProps {
  location: {
    pathname: string;
  };
  data?: {
    github?: {
      user: {
        pinnedItems: {
          edges: [
            {
              node: IGitHubPinnedRepo;
            }
          ];
        };
      };
    };
  };
}

class Projects extends React.Component<ProjectsProps> {
  render() {
    const { github } = this.props.data;
    let githubPinnedRepos: IGitHubPinnedRepo[] = [];

    if (github && has(github, "user.pinnedItems.edges")) {
      githubPinnedRepos = github.user.pinnedItems.edges.map(({ node }) => node);
    }

    return (
      <SiteLayout location={this.props.location}>
        <SEO
          title="Projects"
          path="/projects"
          description="Information about the web, mobile and cloud app \
          projects that I work on and see my contributions to open-source tools \
          and the OSS community."
        />

        <LayoutContextConsumer>
          {({ breakpoint }) => (
            <div style={{ ...gridContainerStyles }}>
              <h1>Projects</h1>

              <p>
                I'm currently Technical Lead for web, mobile and content apps{" "}
                and teams at <IILink />.
              </p>

              <p>
                I also build open-source tools and contribute back to the OSS
                community, some of my projects are below:
              </p>

              {githubPinnedRepos.length > 0 && (
                <div>
                  <h2>Open-Source Software (OSS) Projects</h2>
                  <div
                    style={{
                      ...cardGridContainerStyles(breakpoint),
                    }}
                  >
                    {githubPinnedRepos
                      .sort(
                        (a: IGitHubPinnedRepo, b: IGitHubPinnedRepo) =>
                          moment(a.updatedAt).unix() +
                          moment(b.updatedAt).unix()
                      )
                      .map((repo: IGitHubPinnedRepo, i: number) => (
                        <Card
                          key={i}
                          width={breakpoint === "sm" ? 100 : 50}
                          to={repo.url}
                          target="_blank"
                          title={repo.name}
                        >
                          <h3
                            style={{
                              position: "relative",
                              paddingLeft: "35px",
                            }}
                          >
                            <Icon
                              title={`@dominicfallows GitHub Repo: ${repo.name}`}
                              icon="github"
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                height: "25px",
                                width: "25px",
                              }}
                            />
                            {repo.name}
                          </h3>

                          <div
                            dangerouslySetInnerHTML={{
                              __html: repo.descriptionHTML,
                            }}
                            style={{
                              fontSize: "0.9em",
                            }}
                          />

                          {repo.isFork && (
                            <div
                              style={{
                                marginTop: "1rem",
                              }}
                            >
                              <span
                                style={{
                                  ...tagStyle,
                                }}
                              >
                                Fork with my contributions to the official repo
                              </span>
                            </div>
                          )}
                        </Card>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </LayoutContextConsumer>
      </SiteLayout>
    );
  }
}

export default Projects;

export const pageQuery = process.env.GITHUB_PAT_READ_ALL_USER_PROFILE_DATA
  ? graphql`
      query {
        github {
          user(login: "dominicfallows") {
            pinnedItems(first: 100) {
              edges {
                node {
                  ... on GitHub_Repository {
                    name
                    updatedAt
                    createdAt
                    pushedAt
                    descriptionHTML
                    id
                    isFork
                    isPrivate
                    url
                  }
                }
              }
            }
          }
        }
      }
    `
  : undefined;
