const path = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    'bundle':  path.resolve(__dirname, './src/index.js')
  },
  
  output: {
    path: path.resolve(__dirname, 'dist'),  
    filename: '[name].js',
    publicPath: '/dist/'
  },

  resolve: {
    alias: {
    },
  },

  plugins: [
    new HTMLPlugin({
      template: './src/index.html',
      filename: '../index.html'
    })
  ],

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, exclude: /node_modules/, loader: ['style-loader', 'css-loader'] },
      { test: /\.(png|svg)$/, exclude: /node_modules/, loader: 'file-loader' }
    ]
  }
}