const path = require('path');
const webpack = require('webpack');
const RemixJSPlugin = require('webpack-remixjs-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  devtool: 'cheap-module-source-map',
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

  entry: {},

  output: {},

  resolve: {
    alias: {
      'react': 'remixjs',
      'react-dom': 'remixjs',
      'prop-types': 'remixjs/prop-types',
    },
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new RemixJSPlugin(),
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/wxss/boot.ui.wxss',
    })
  ],

  module: {
    rules: [
      { use: 'babel-loader',  test:/\.(js|jsx)$/ },
      { 
        use: [
          { loader: MiniCssExtractPlugin.loader }, 
          'css-loader', 
          'less-loader'
        ],  
        test:/\.less$/ 
      },
      { 
        use: [ MiniCssExtractPlugin.loader, 'css-loader' ],  
        test:/\.css$/ 
      },
      { 
        use: [
          { 
            loader: 'remixjs-file-loader', 
            options: { dist: project.PROJECT_COMPILED_PATH } 
          }
        ],  
        test:/\.(png|jpg|gif|svg|ico)$/ 
      },
    ]
  },

  optimization: {
    runtimeChunk: {
      name: 'runtime/manifest'
    },
    splitChunks: {
      chunks: 'initial',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'runtime/vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
        }
      }
    }
  }
}


module.exports = {
  createDevelopment (pages, dist) {
    return {
      ...config,
      entry: {
        'runtime/index': path.resolve()
      },
      output: {
        path: dist,
        filename: '[name].js',
      },
      mode: 'development'
    }
  }
}