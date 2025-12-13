const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
module.exports = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/preset-scss',
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-docs',
  ],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  stories: ['../src/**/stories.@(js|jsx|ts|tsx)'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  // modify webpack to allow absolute paths.
  webpackFinal: async config => {
    if (config.resolve) {
      config.resolve.plugins = [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          extensions: config.resolve.extensions,
        }),
      ];
    }
    return config;
  },
};
