const eslintFormatter = require('react-dev-utils/eslintFormatter')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { merge } = require('lodash')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

function createClientConfig(
  root,
  {
    // This is where the developer will add additional entries for adapt components.
    entries = {},
    alias = {}
  }
) {
  return {
    name: 'client',
    target: 'web',
    context: path.join(root, 'src'),
    entry: Object.assign({ 
      main: ['./client.js'],
      installServiceWorker: path.join(root, 'node_modules', 'react-storefront', 'amp', 'installServiceWorker')
    }, entries),
    resolve: {
      alias: Object.assign({}, createAliases(root), alias, {
        fetch: 'isomorphic-unfetch'
      })
    },
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      path: path.join(root, 'build', 'assets', 'pwa'),
      publicPath: '/pwa/',
      devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    }
  }
}

function createServerConfig(root, alias) {
  return merge({
    name: 'server',
    context: path.join(root, 'src'),
    resolve: {
      alias: Object.assign({}, createAliases(root), alias, {
        fetch: path.join(root, 'node_modules', 'react-storefront', 'fetch'),
      })
    }
  })
}

function createLoaders(sourcePath, { envName, assetsPath='.', eslintConfig } = {}) {
  return [
    {
      test: /\.js$/,
      enforce: 'pre',
      include: sourcePath,
      use: [
        {
          loader: 'eslint-loader',
          options: {
            formatter: eslintFormatter,
            eslintPath: require.resolve('eslint'),
            baseConfig: eslintConfig
          }
        }
      ]
    },
    {
      test: /\.js$/,
      enforce: 'pre',
      exclude: [/node_modules/],
      use: [
        {
          loader: 'source-map-loader'
        }
      ]
    },
    {
      test: /\.css$/,
      use:['style-loader','css-loader']
    },
    {
      test: /\.js$/,
      include: /(src|node_modules\/proxy-polyfill)/,
      use: [
        { loader: 'babel-loader', options: { envName }}
      ]
    },
    {
      test: /\.(png|jpg|gif|otf|woff|ttf)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            // having a limit here is critical to keeping css size below amp's limits.
            // when an asset is larger than this limit in bytes, webpack falls back to using
            // file-loader
            limit: 8192,
            fallback: 'file-loader',
            outputPath: assetsPath,
            publicPath: '/pwa'
          }
        }
      ]
    },
    {
      test: /\.svg$/,
      use: [
        { loader: 'babel-loader', options: { envName }},
        { loader: "react-svg-loader" }
      ]
    },
    {
      test: /\.(md|html)$/,
      use: 'raw-loader'
    }
  ]
}

function createPlugins(root) {
  return [
    new CleanWebpackPlugin([
      path.join(root, 'build', 'assets'),
      path.join(root, 'scripts', 'build')
    ], { 
      allowExternal: true,
      verbose: false
    }),
    new HtmlWebpackPlugin({
      filename: 'install-service-worker.html',
      title: 'Installing Service Worker...',
      chunks: ['bootstrap', 'installServiceWorker']
    })
  ]
}

function createAliases(root) {
  return {
    "mobx": path.join(root, 'node_modules', 'mobx'),
    "lodash": path.join(root, 'node_modules', 'lodash'),
    "react": path.join(root, 'node_modules', 'react'),
    "react-dom": path.join(root, 'node_modules', 'react-dom'),
    "react-helmet": path.join(root, 'node_modules', 'react-helmet'),
    "@material-ui/core": path.join(root, 'node_modules', '@material-ui/core'),
    "react-universal-component": path.join(root, 'node_modules', 'react-universal-component'),
    "react-transition-group": path.join(root, 'node_modules', 'react-transition-group')
  }
}

const optimization = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        warnings: false,
        ie8: false,
        compress: {
          comparisons: false,
        },
        parse: {},
        mangle: true,
        output: {
          comments: false,
          ascii_only: true,
        },
      },
      parallel: true,
      cache: true,
      sourceMap: true,
    }),
  ],
}

module.exports = {
  createClientConfig,
  createServerConfig,
  createPlugins,
  createLoaders,
  optimization
}
