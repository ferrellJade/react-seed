/* global __dirname */
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.babel');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const devMode = process.env.NODE_ENV === 'production';
const STATIC_PATH = 'static';
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: { // split `common`和`components`目录下被打包的代码到`page/commons.js && .css`
                    test: /common\/|components\//,
                    name: 'commons',
                    priority: 10,
                    minChunks: 2, // 表示被引用次数，默认为1；
                    enforce: true
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                    priority: -10
                }
                // css: {
                //     name: `${STATIC_PATH}/css/styles.css`,
                //     test: /\.(scss|css)$/,
                //     enforce: true
                // } // 会生成css文件
            }
        },
        runtimeChunk: {
            name: STATIC_PATH
        },
        minimizer: [
            // 对js文件进行压缩,在output之中设置了filename和chunkFilename之后，webpack4的默认压缩就无效了
            new UglifyJsPlugin({
                test: /\.js($|\?)/i,
                uglifyOptions: {
                    sourceMap: 'source-map',
                    mangle: true // 启用代码混淆
                }
            }),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css\?_=[a-z0-9]*$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', {
                        discardComments: {
                            removeAll: true
                        },
                        normalizeUnicode: false
                    }]
                },
                canPrint: true
            })
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
