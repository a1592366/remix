const { relative, resolve, join } = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  mode: 'development',
  // devtool: 'cheap-module-source-map',
  // devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/assets/'
  },

  node: {
    fs: 'empty',
    module: 'empty',
    child_process: 'empty'
  },
  stats: {
    all: false,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    moduleTrace: true,
    errorDetails: true,
    colors: true,
  },

  entry: {
    'index': './src/index'
  },

  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist'), 
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new ProgressBarPlugin()
  ],

  module: {
    rules: [
      { 
        use: {
          loader: 'babel-loader',
          options: {
            exclude: /node_modules/,
          }
        },  
        test:/\.(js|jsx)$/ 
      }
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'initial',
      minSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'runtime/vendor/manifest',
          test: /(\.js|\.jsx)$/,
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
        },
        style: {
          name: 'runtime',
          test: /\.css$/,
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
        }
      }
    }
  }
}