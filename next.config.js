const webpackConfig = require('./webpack.config.js');

module.exports = {
  webpack: (config, { dev }) => webpackConfig(config, { dev })
};
