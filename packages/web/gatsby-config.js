const titleParts = [
  "Dominic Fallows",
  "Technical Lead and Senior Developer",
  "Web, Mobile and Cloud Apps",
];

module.exports = {
  siteMetadata: {    
    title: `${titleParts[0]} - ${titleParts[1]} for ${titleParts[2]}`,
    titleParts: titleParts,
    author: `Dominic Fallows`,
    description: `Welcome, I’m Dominic. I have 18+ years experience in developing and delivering web, mobile and cloud applications using the latest technologies.`,
    siteUrl: `https://dominicfallows.uk`,
    social: [
      {
        name: "Twitter",
        profile: `dominicfallows`,
        url: `https://twitter.com/dominicfallows`,
      },
      {
        name: "GitHub",
        profile: `dominicfallows`,
        url: `https://github.com/dominicfallows`,
      },
      {
        name: "npm",
        profile: `dominicfallows`,
        url: `https://www.npmjs.com/~dominicfallows`,
      },
      {
        name: "LinkedIn",
        profile: `dominicfallows`,
        url: `https://www.linkedin.com/in/dominicfallows`,
      },
    ],
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,

    // Add static assets before markdown files
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `../shared/content/markdown`,
        name: `markdown`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `../shared/content/assets`,
        name: `assets`,
      },
    },

    // Now process markdown files
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // gatsby-remark-relative-images must go before gatsby-remark-images
          {
            resolve: `gatsby-remark-relative-images`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              withWebp: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dominic Fallows`,
        short_name: `Dominic Fallows`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#0095cc`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: `../shared/content/assets/favicon.jpg`, // auto-creates icon set
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `../shared-web/styles/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-json-output`,
      options: {
        graphQLQuery: "`allMarkdownRemark(limit: 1000) { \
          edges { node { fields { path } } } \
        }`"
      }
    }
  ],
};
