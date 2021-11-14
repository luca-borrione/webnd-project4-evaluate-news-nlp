/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
// const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: './src/client/index.js',
  mode: 'development',
  devtool: 'source-map',
  stats: 'verbose',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebPackPlugin({
      template: './src/client/views/index.html',
      filename: './index.html',
    }),
    new CleanWebpackPlugin({
      dry: true,
      verbose: true,
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
  ],
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
