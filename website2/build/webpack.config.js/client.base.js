const path = require('path')
const merge = require('webpack-merge')
const ModuleFederationPlugin = require(
  'webpack/lib/container/ModuleFederationPlugin',
)
const { client: clientLoaders } = require('./loaders')
const plugins = require('./plugins')
const common = require('./common.base')

module.exports = merge.smart(common, {
  name: 'client',
  target: 'web',
  entry: ['@babel/polyfill', path.resolve(__dirname, '../../src/index.js')],
  output: {
    publicPath: 'http://localhost:3002/static/',
  },
  module: {
    rules: clientLoaders,
  },
  plugins: [
    ...plugins.client,
    new ModuleFederationPlugin({
      name: 'website2',
      library: { type: 'var', name: 'website2' },
      filename: 'src/index.js',
      exposes: {
        SomeComponent: './src/components/SomeComponent',
      },
      remotes: {
        website1: 'website1',
      },
      shared: [
        'react',
        'react-dom',
      ],
    }),
  ],
})
