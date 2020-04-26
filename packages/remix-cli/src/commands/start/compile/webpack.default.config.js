const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const uuid = require('uuid');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = require('../../../config/env');
const proj = require('../../../config/proj');

class RemixGlobalWebpackPlugin {
  constructor () {
    this.mark = 'MARK_' + (new Date - 0);
  }

  polyfill (source) {
    return () => `/*** ${this.mark} WeChat GlobalWindow ***/ var window = Object.__GlobalWindow__ || (Object.__GlobalWindow__ = {}); /*** WeChat globalWindow ***/ ${source.replace('var installedModules = {}', 'var installedModules = window.installedModules || (window.installedModules = {})')}`;
  }

  replace (assets) {
    
    Object.keys(assets).forEach(name => {
      const asset = assets[name];
      const source = asset.source();

      if (
        /(\.js|\/.jsx)$/g.test(name) && 
        source.indexOf(this.mark) === -1
      ) {
        asset.source = this.polyfill(source);
      }
    });

    return assets;
  }

  apply (compiler) {
    compiler.hooks.afterCompile.tap('RemixGlobalWebpackPlugin', (compilation, callback) => {
      compilation.assets = this.replace(compilation.assets);
    });

    compiler.hooks.emit.tapAsync('RemixGlobalWebpackPlugin', (compilation, callback) => {
      compilation.assets = this.replace(compilation.assets);
      callback();
    });
  }
}


module.exports = {
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

  entry: {
    'runtime/index': proj.REMIX_CLIENT_RUNTIME,
  },

  output: {
    filename: '[name].js',
    path: proj.REMIX_SOURCE,    
  },

  resolve: {
    alias: {
      'react': '@remix/core',
      'react-dom': '@remix/core',
      'prop-types': '@remix/core/prop-types',
    },
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new RemixGlobalWebpackPlugin(),
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/wxss/app.ui.wxss',
    }),
    new webpack.DefinePlugin({
      'process.env.INSPECTOR': `${JSON.stringify(env.INSPECTOR)}`
    })
  ],

  module: {
    rules: [
      { 
        use: {
          loader: 'babel-loader',
          options: {
            exclude: /node_modules/,
            ...fs.readJSONSync(path.resolve(proj.PROJ_DIR, '.babelrc')),
            
          }
        },  
        test:/\.(js|jsx)$/ 
      },
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
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      // { 
      //   use: [
      //     { 
      //       loader: 'remixjs-file-loader'
      //     }
      //   ],  
      //   test:/\.(png|jpg|gif|svg|ico)$/ 
      // },
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