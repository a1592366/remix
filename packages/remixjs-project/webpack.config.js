const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  
  entry: {
    'dist/project': path.resolve(__dirname, './index.js'),
  },
  
  output: {
    path: __dirname,  
    filename: '[name].js',
    publicPath: '/dist/',
    library: '[name]',
    globalObject: 'this',
    libraryTarget: 'umd'
  },

  resolve: {
    alias: {
      'react': path.resolve(__dirname, 'src/index')
    },
  },

  module: {

    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}