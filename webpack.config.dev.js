const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.babel');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(commonConfig, {
    devtool: 'inline-source-map',
    mode: 'development',
    performance: {
        hints: false,
    },
    module: {
        rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: "babel-loader",
                  options: {
                      // presets: ['@babel/preset-env', '@babel/react'],
                      // plugins: [
                      //     [require("@babel/plugin-proposal-decorators"), { "legacy": true }]
                      // ]
                  }
              }
            }
        ]
    },
    
    plugins: [
       //
    ]
});
