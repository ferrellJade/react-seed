/* global __dirname */
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.babel');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = webpackMerge(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [{
            // eslint代码规范校验
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            include: path.join(__dirname, 'src'),
            use: [{
                loader: 'eslint-loader',
                options: {
                    configFile: '.eslintrc.prod.json'
                }
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({               // 配置全局变量
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false
        })
    ]
});
