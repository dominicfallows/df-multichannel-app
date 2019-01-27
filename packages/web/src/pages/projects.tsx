import { graphql } from "gatsby";
import { has } from "lodash";
import * as React from "react";

import Card from "@df/multichannel-app-shared-web/components/Card";
import { Consumer as LayoutContextConsumer } from "@df/multichannel-app-shared-web/contexts/Layout";
import {
  cardGridContainerStyles,
  gridContainerStyles,
} from "@df/multichannel-app-shared-web/styles/grid";

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

    if (
      github &&
      has(github, "repositoryOwner.pinnedRepositories.edges")
    ) {
      githubPinnedRepos = github.repositoryOwner.pinnedRepositories.edges.map(
        ({ node }) => node,
      );
    }

    return (
      <Layout location={this.props.location}>
        <SEO title="Projects" />

        <LayoutContextConsumer>
          {({ breakpoint }) => (
            <div style={{ ...gridContainerStyles }}>
              <h1>Projects</h1>

              {githubPinnedRepos.length > 0 &&
                <div
                  style={{
                    ...cardGridContainerStyles(breakpoint),
                  }}
                >
                  {githubPinnedRepos.map((repo: IGitHubPinnedRepo, i: number) => (
                    <Card
                      key={i}
                      width={33}
                      to={repo.url}
                      target="_blank"
                      title={repo.name}
                    >
                      {repo.name}
                    </Card>
                  ))}
                </div>
              }
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
