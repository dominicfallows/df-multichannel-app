const path = require("path");
const escapeStringRegexp = require("escape-string-regexp");
const defaultOptions = require("../utils/default-options");

module.exports = (
  { stage, loaders, actions, plugins, ...other },
  pluginOptions
) => {
  const options = defaultOptions(pluginOptions);
  const testPattern = new RegExp(
    options.extensions.map(ext => `${escapeStringRegexp(ext)}$`).join("|")
  );

  const gatsbyMdxPluginPath = path.resolve(__dirname, "../");

  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, ".cache/gatsby-mdx"),
          use: [loaders.js()]
        },
        {
          test: /\.js$/,
          include: gatsbyMdxPluginPath,
          use: [loaders.js()]
        },

        {
          test: /loaders\/mdx-components\.js$/,
          include: gatsbyMdxPluginPath,
          use: [
            loaders.js(),
            {
              loader: path.resolve(gatsbyMdxPluginPath, "loaders/mdx-components"),
              options: {
                plugins: options.mdxPlugins
              }
            }
          ]
        },
        {
          test: testPattern,
          use: [
            loaders.js(),
            {
              loader: path.resolve(gatsbyMdxPluginPath, "loaders/mdx-loader"),
              options: {
                ...other,
                pluginOptions: options
              }
            }
          ]
        }
      ]
    },
    plugins: [
      plugins.define({
        __DEVELOPMENT__: stage === `develop` || stage === `develop-html`
      })
    ]
  });
};
