const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const uuid = require('uuid');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = require('../env');

class RemixGlobalWebpackPlugin {
  constructor () {
    this.mark = 'MARK_' + (new Date - 0);
  }

  polyfill (source) {
    return `/*** ${this.mark} WeChat GlobalWindow ***/ var window = Object.__GlobalWindow__ || (Object.__GlobalWindow__ = {}); /*** WeChat globalWindow ***/ ${source.replace('var installedModules = {}', 'var installedModules = window.installedModules || (window.installedModules = {})')}`;
  }

  replace (assets) {
    
    Object.keys(assets).forEach(name => {
      const asset = assets[name];
      const source = asset.source();

      if (
        /(\.js|\/.jsx)$/g.test(name) && 
        source.indexOf(mark) === -1
      ) {
        asset.source = polyfill(source);
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
    'runtime/index': env.REMIX_CLIENT_RUNTIME,
  },

  output: {
    filename: '[name].js',
    path: env.REMIX_SOURCE,    
  },

  resolve: {
    alias: {
      'react': 'remixjs',
      'react-dom': 'remixjs',
      'prop-types': 'remixjs/prop-types',
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
      'process.env.IS_INSPECT_MODE': `${env.IS_INSPECT_MODE}`,
      'process.env.INSPECT_UI_URL': `"${env.INSPECT_UI_URL}"`,
      'process.env.INSPECT_WS_URL': `"${env.INSPECT_WS_URL}"`,
      'process.env.INSEPCT_MESSAGE_TYPES': `${JSON.stringify(env.INSEPCT_MESSAGE_TYPES, 2, null)}`,
      'process.env.INSPECT_TERMINAL_TYPES': `${JSON.stringify(env.INSPECT_TERMINAL_TYPES, 2, null)}`,
      'process.env.INSPECT_TERMINAL_UUID': `"${uuid.v4()}"`,
      'process.env.INSPECT_LOGIC_UUID': `"${uuid.v4()}"`,
    })
  ],

  module: {
    rules: [
      { 
        use: {
          loader: 'babel-loader',
          options: {
            exclude: /node_modules/,
            ...fs.readJSONSync(path.resolve(env.PROJ, '.babelrc')),
            
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