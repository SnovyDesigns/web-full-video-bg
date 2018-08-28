const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = env => {
  return {
    entry: {
      main: ['./src/main.js']
    },
    mode: 'production',
    output: {
      filename: '[name]-bundle.js',
      path: path.resolve(__dirname, '../docs'),
      publicPath: ''
    },
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
              loader: MiniCSSExtractPlugin.loader
            },
            {
              loader: 'css-loader'
            }
          ]
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            {
              loader: MiniCSSExtractPlugin.loader
            },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
          ]
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'images/[name].[ext]'
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                }
              }
            }
          ]
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: {
            loader: 'url-loader',
            options: {
              name: 'fonts/[name].[ext]',
              limit: 10000
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
              loader: 'html-loader'
            }
          ]
        },
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'pug-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new OptimizeCssAssetsPlugin(),
      new MiniCSSExtractPlugin({
        filename: '[name]-[contenthash].css'
      }),
      new HTMLWebpackPlugin({
        template: './src/index.pug'
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env.NODE_ENV)
        }
      }),
      new MinifyPlugin(),
      new CompressionPlugin({
        test: /\.(html|css|js)/,
        algorithm: 'gzip'
      }),
      new BrotliPlugin()
    ]
  };
};
