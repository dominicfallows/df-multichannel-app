import { graphql } from "gatsby";
import { has } from "lodash";
import moment from "moment";
import * as React from "react";

import Card from "@df/multichannel-app-shared-web/components/Card";
import Icon from "@df/multichannel-app-shared-web/components/Icon";
import Link from "@df/multichannel-app-shared-web/components/Link";
import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";
import {
  cardGridContainerStyles,
  gridContainerStyles,
} from "@df/multichannel-app-shared-web/styles/grid";
import { tagStyle } from "@df/multichannel-app-shared/styles/tags";

import SEO from "../components/SEO";
import Layout from "../containers/Layout";

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
      repositoryOwner: {
        pinnedRepositories: {
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

    if (github && has(github, "repositoryOwner.pinnedRepositories.edges")) {
      githubPinnedRepos =
        github.repositoryOwner.pinnedRepositories.edges.map(({ node }) => node);
    }

    return (
      <Layout location={this.props.location}>
        <SEO title="Projects" />

        <LayoutContextConsumer>
          {({ breakpoint }) => (
            <div style={{ ...gridContainerStyles }}>
              <h1>Projects</h1>

              <p>
                During the day I am the{" "}
                <strong>Apps Technical Lead (web, mobile, content)</strong>{" "}
                for{" "}
                <Link
                  to="https://www.ii.co.uk"
                  title="interactive investor is a low cost, award winning, online
                  investment platform enabling you to easily manage shares, funds,
                  SIPPs, ISAs and more...."
                  target="_blank"
                  type="secondary"
                >
                  interactive investor, a low cost, award winning, online
                  investment platform
                </Link>
                , leading the technical strategy and teams who build the platform's apps
                for web and mobile devices.
              </p>

              <p>
                I also build open-source tools and contribute back to the OSS community,{" "}
                some of my projects are below:
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
                          width={50}
                          to={repo.url}
                          target="_blank"
                          title={repo.name}
                        >
                          <h3
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Icon
                              title={`@dominicfallows GitHub Repo: ${
                                repo.name
                              }`}
                              icon="github"
                              style={{
                                marginRight: "1rem",
                                marginBottom: 0,
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
                                This is fork where I contribute to official
                                repo
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
      </Layout>
    );
  }
}

export default Projects;

export const pageQuery = process.env.GITHUB_PAT_READ_ALL_USER_PROFILE_DATA
  ? graphql`
      query {
        github {
          repositoryOwner(login: "dominicfallows") {
            pinnedRepositories(first: 100) {
              edges {
                node {
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
    `
  : undefined;
