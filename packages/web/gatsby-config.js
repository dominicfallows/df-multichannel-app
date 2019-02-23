const titleParts = [
  "Dominic Fallows",
  "Technical Lead and Senior Developer",
  "Web, Mobile and Cloud Apps",
];

const siteUrl = "https://dominicfallows.uk";

module.exports = {
  siteMetadata: {
    title: `${titleParts[0]} - ${titleParts[1]} for ${titleParts[2]}`,
    titleParts: titleParts,
    author: "Dominic Fallows",
    description:
      "Hi, I’m Dominic, a seasoned developer, leader and life-long enthusiast of technology, software engineering and business. Building web, mobile and cloud apps, products and teams.",
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
    // "gatsby-transformer-remark",
    "gatsby-image",
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
      resolve: "gatsby-mdx",
      options: {
        decks: [],
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
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
              maxWidth: 1035,
              sizeByPixelDensity: true,
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
        //trackingId: "ADD YOUR TRACKING ID HERE",
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Dominic Fallows",
        short_name: "Dominic Fallows",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#0095cc",
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
              limit: 1000
            ) {
              edges {
                node {
                  html
                  fields { path }
                  frontmatter {
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
          results.data.allMdx.edges.map(({ node }) => ({
            path: node.fields.path, // MUST contain a path
            title: node.frontmatter.title,
            created: node.frontmatter.created,
            updated: node.frontmatter.updated,
            html: node.html,
          })),
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
          Authorization: `bearer ${
            process.env.GITHUB_PAT_READ_ALL_USER_PROFILE_DATA
          }`,
        },
        fetchOptions: {},
      },
    },
  ],
};
