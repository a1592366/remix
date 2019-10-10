const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  
  entry: {
    'dist/remix': path.resolve(__dirname, './index.js'),
    // 'components': path.resolve(__dirname, './src/components/index.js'),
    // 'runtime': path.resolve(__dirname, './src/runtime/index.js'),
    // 'project': path.resolve(__dirname, './src/project/index.js'),
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
      'react': path.resolve(__dirname, 'src/index'),
      'react-dom': path.resolve(__dirname, 'src/index'),
      'document': path.resolve(__dirname, 'src/document'),
    },
  },

  module: {

    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}