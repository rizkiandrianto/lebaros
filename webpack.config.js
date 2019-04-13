const path = require('path');
const glob = require('glob');

module.exports = (config = {}, param = {}) => {
  const { dev } = param;

  config.module.rules = [
    ...((config.module && config.module.rules) || []),
    {
      test: /\.s(a|c)ss$/,
      use: ['raw-loader',
        {
          loader: 'sass-loader',
          options: {
            sourceMap: dev,
            includePaths: ['styles', 'node_modules']
              .map(d => path.join(__dirname, d))
              .map(g => glob.sync(g))
              .reduce((a, c) => a.concat(c), [])
          }
        }
      ]
    }
  ];

  return config;
};
