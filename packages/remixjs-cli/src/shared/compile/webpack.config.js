const path = require('path');
const fs = require('fs-extra');
const RemixJSPlugin = require('webpack-remixjs-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = require('../env');


const defaultWebpackConfig = {
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
        use: [
          { 
            loader: 'remixjs-file-loader'
          }
        ],  
        test:/\.(png|jpg|gif|svg|ico)$/ 
      },
    ]
  },

  optimization: {
    splitChunks: {
      chunks: 'initial',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'runtime/vendor/manifest',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
        }
      }
    }
  }
}


module.exports = {
  createDevelopment (pages) {
    const config = {
      ...defaultWebpackConfig,
      entry: {
        'runtime/index': env.REMIX_BOOT
      },
      mode: 'development',
      output: {
        filename: '[name].js',
        path: env.REMIX_SOURCE,
        globalObject: 'window',
        libraryTarget: 'umd',
        umdNamedDefine: true
      }
    }

    pages.forEach(page => {
      const parsed = path.parse(page);
      const source = path.join(env.REMIX_SOURCE, parsed.dir, `${env.REMIX_VIEW_SYMBOL}${parsed.base}.js` );
      config.entry[`${page}`] = source;
    });

    return config;
  }
}