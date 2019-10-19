const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack')
const RemixJSPlugin = require('webpack-remixjs-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPulgin = require('copy-webpack-plugin');

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

  entry: {
    'runtime/index': env.REMIX_CLIENT_RUNTIME
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
    new RemixJSPlugin(),
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/wxss/app.ui.wxss',
    }),
    new webpack.DefinePlugin({
      'process.env.IS_INSPECT_MODE': `${env.IS_INSPECT_MODE}`,
      'process.env.INSPECT_UI_URL': `"${env.INSPECT_UI_URL}"`,
      'process.env.INSPECT_WS_URL': `"${env.INSPECT_WS_URL}"`,
      'process.env.INSEPCT_MESSAGE_TYPES': `${JSON.stringify(env.INSEPCT_MESSAGE_TYPES, 2, null)}`
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


module.exports = {
  createDevelopment (context) {
    const { router: { routes }, tabBar } = context;
    const config = {
      ...defaultWebpackConfig,
      mode: 'development'
    }

    routes.forEach(route => {
      const parsed = path.parse(route.path);
      const source = path.join(
        env.REMIX_SOURCE, 
        parsed.dir, 
        `${env.REMIX_VIEW_SYMBOL}${parsed.base}.js` 
      );

      config.entry[`${route.path}`] = source;
    });

    const source = [
      './static/wxss/runtime.ui.wxss'
    ];

    tabBar.items.filter(tab => {
      return tab.icon || tab.selectedIcon
    }).forEach(tab => {
      if (!source.includes(tab.icon)) {
        source.push(tab.icon);
      }

      if (!source.includes(tab.selectedIcon)) {
        source.push(tab.selectedIcon);
      }
    });

    if (source.length > 0) {
      config.plugins.push(
        new CopyPulgin(source.map(src => {
          return {
            from: path.resolve(env.PROJ_SOURCE, src),
            to: path.resolve(env.REMIX_SOURCE, src)
          }
        }))
      );
    }

    return config;
  }
}