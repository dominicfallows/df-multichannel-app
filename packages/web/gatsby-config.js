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
    description: `Technical Lead and Senior Developer for Web, Mobile and Cloud apps`,
    siteUrl: `https://dominicfallows.uk`,
    social: {
      twitter: `dominicfallows`,
    },
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
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
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
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
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `../shared/content/assets/gatsby-icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `../shared-web/styles/typography`,
      },
    },
  ],
};
