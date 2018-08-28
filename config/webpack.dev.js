const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: {
    main: ['./src/main.js']
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, '../docs'),
    publicPath: ''
  },
  devServer: {
    contentBase: 'dist',
    overlay: true,
    stats: {
      colors: true
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader'
          },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[name].[ext]',
            limit: 10 * 1024
          }
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          name: 'images/[name].[ext]',
          limit: 10 * 1024,
          noquotes: true
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'fonts/[name].[ext]',
            limit: 10 * 1024
          }
        }
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader?attrs[]=video:src'
          }
        ]
      },
      {
        test: /\.pug$/,
        use: ['html-loader?attrs[]=video:src', 'pug-html-loader']
      },
      {
        test: /\.(mov|mp4|ogv|webm)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.pug'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:8080/'
    })
  ]
};
