/* global __dirname */
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.babel');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const STATIC_PATH = 'static';

module.exports = webpackMerge(baseConfig, {
    mode: "production",
    devtool: 'source-map',
    module: {
        rules: [{
        /**
         * eslint代码规范校验
         */
            // test: /\.(js|jsx)$/,
            // enforce: 'pre',
            // include: path.join(__dirname, 'src'),
            // // exclude: path.join(__dirname, 'src/components/companyInfo/companyInfo/relateInfo/map'), // 可以不用定义这个字段的属性值，eslint会自动忽略node_modules和bower_
            // use: [{
            //     loader: 'eslint-loader',
            //     options: {
            //         configFile: '.eslintrc.prod.json'
            //     }
            // }]
        }
    ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({               // 配置全局变量
            'process.env.NODE_ENV': JSON.stringify('production'),
            __DEV__: false
        })
    ]
});
