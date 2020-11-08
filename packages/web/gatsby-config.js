const siteTitleParts = [
  "Dominic Fallows",
  "Technical Leader and Senior Software Engineer",
  "web, mobile, desktop and cloud",
];
const siteTitle = `Dominic Fallows | Technical Leader and Senior Software Engineer | Web, Mobile, Desktop, Cloud`;
const siteAuthorName = "Dominic Fallows";
const siteDescription =
  "Blog and project site of Dominic Fallows, experienced Technical Leader and Senior Software Engineer for cross-platform web, mobile, desktop and cloud apps, products and teams, based in Manchester, UK";

const siteUrl =
  process.env.NODE_ENV === "production"
    ? process.env.GATSBY_SITE_URL || "http://localhost:9000"
    : "http://localhost:8000";

module.exports = {
  siteMetadata: {
    title: siteTitle,
    siteTitleParts: siteTitleParts,
    author: siteAuthorName,
    description: siteDescription,
    siteUrl: siteUrl,
    social: [
      {
        name: "Twitter",
        profile: "dominicfallows",
        url: "https://twitter.com/dominicfallows",
      },
      {
        name: "GitHub",
        profile: "dominicfallows",
        url: "https://github.com/dominicfallows",
      },
      {
        name: "npm",
        profile: "dominicfallows",
        url: "https://www.npmjs.com/~dominicfallows",
      },
      {
        name: "LinkedIn",
        profile: "dominicfallows",
        url: "https://www.linkedin.com/in/dominicfallows",
      },
    ],
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-typescript",
    "gatsby-image",
    "gatsby-plugin-polyfill-io",
    "gatsby-plugin-remove-trailing-slashes",
    "gatsby-plugin-offline",
    // Add source files before MDX
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "../shared/content/markdown/dummyModels",
        ignore: ["**/.tsx*"],
        name: "dummyModels",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "../shared/content/markdown/posts",
        ignore: ["**/.tsx*"],
        name: "posts",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "../shared/content/markdown/pages",
        ignore: ["**/.tsx*"],
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "../shared/content/assets",
        name: "assets",
      },
    },
    // Now MDX
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-autolink-headers",
            options: {},
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow noopener noreferrer",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 650,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId:
          process.env.NODE_ENV === "production"
            ? process.env.GATSBY_GOOGLE_ANALYTICS_TRACKING_ID
            : "",
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.NODE_ENV === "production"
            ? process.env.GATSBY_GOOGLE_GLOBAL_SITE_TAG
            : "",
        ],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: siteTitle,
        short_name: siteAuthorName,
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#000000",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "../shared/content/assets/favicon.jpg", // auto-creates icon set
      },
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "../shared-web/styles/typography",
      },
    },
    {
      resolve: "gatsby-plugin-json-output",
      options: {
        siteUrl: siteUrl,
        graphQLQuery: `
          {
            allMdx(
              sort: { fields: [frontmatter___created], order: DESC }
              filter: {fields: {type: {in: ["page", "post"]}}}
              limit: 1000
            ) {
              edges {
                node {
                  html
                  excerpt
                  fields {
                    type
                    path
                  }
                  frontmatter {
                    path
                    title
                    created
                    updated
                  }
                }
              }
            }
          }
        `,
        serialize: results =>
          results.data.allMdx.edges
            .filter(({ node }) => ["post", "page"].includes(node.fields.type))
            .map(({ node }) => ({
              path: node.frontmatter.path || node.fields.path, // MUST contain a path
              title: node.frontmatter.title,
              created: node.frontmatter.created,
              updated: node.frontmatter.updated,
              html: node.html,
            })),
        feedMeta: {
          author: {
            name: siteAuthorName,
          },
          description: siteDescription,
          favicon: `${siteUrl}/icons/icon-48x48.png`,
          title: siteTitle,
        },
        serializeFeed: results =>
          results.data.allMdx.edges
            .filter(({ node }) => ["post"].includes(node.fields.type))
            .map(({ node }) => ({
              date_modified: new Date(node.frontmatter.updated).toISOString(),
              date_published: new Date(node.frontmatter.created).toISOString(),
              excerpt: node.excerpt,
              id: node.frontmatter.path || node.fields.path,
              title: node.frontmatter.title,
              url: siteUrl + (node.frontmatter.path || node.fields.path),
            })),
        feedFilename: "feed-jakob",
        nodesPerFeedFile: 1,
      },
    },
    {
      resolve: "gatsby-plugin-json-output",
      options: {
        siteUrl: siteUrl,
        graphQLQuery: `
          {
            allMdx(
              sort: { fields: [frontmatter___created], order: DESC }
              filter: {fields: {type: {in: ["page", "post"]}}}
              limit: 1000
            ) {
              edges {
                node {
                  html
                  excerpt
                  fields {
                    type
                    path
                  }
                  frontmatter {
                    path
                    title
                    created
                    updated
                  }
                }
              }
            }
          }
        `,
        serialize: results =>
          results.data.allMdx.edges
            .filter(({ node }) => ["post", "page"].includes(node.fields.type))
            .map(({ node }) => ({
              path: node.frontmatter.path || node.fields.path, // MUST contain a path
              title: node.frontmatter.title,
              created: node.frontmatter.created,
              updated: node.frontmatter.updated,
              html: node.html,
            })),
        feedMeta: {
          author: {
            name: siteAuthorName,
          },
          description: siteDescription,
          favicon: `${siteUrl}/icons/icon-48x48.png`,
          title: siteTitle,
        },
        serializeFeed: results =>
          results.data.allMdx.edges
            .filter(({ node }) => ["post"].includes(node.fields.type))
            .map(({ node }) => ({
              date_modified: new Date(node.frontmatter.updated).toISOString(),
              date_published: new Date(node.frontmatter.created).toISOString(),
              excerpt: node.excerpt,
              id: node.frontmatter.path || node.fields.path,
              title: node.frontmatter.title,
              url: siteUrl + (node.frontmatter.path || node.fields.path),
            })),
        feedFilename: "feed-matthew",
        nodesPerFeedFile: 1,
      },
    },
    {
      // GraphQL Source from GitHub
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "GitHub",
        fieldName: "github",
        url: "https://api.github.com/graphql",
        headers: {
          Authorization: `bearer ${process.env.GITHUB_PAT_READ_ALL_USER_PROFILE_DATA}`,
        },
        fetchOptions: {},
      },
    },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/sitemap.xml",
        exclude: [ "/legals" ],
      },
    },
  ],
};
