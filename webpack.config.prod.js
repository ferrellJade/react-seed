const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.babel');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const STATIC_PATH = 'static';

module.exports = webpackMerge(baseConfig, {
    mode: 'production',
    // devtool: 'source-map',
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
                // 不同页面之间的公用模块
                commonCss: {
                    test: /\.(scss|css)$/,
                    chunks: "initial",
                    name: 'commonCss',
                    minChunks: 2,// 最小重复使用的次数
                    minSize: 0 // 最小提取字节数
                },
                // 第三方模块
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                }
            }
        },
        runtimeChunk: {
            name: STATIC_PATH
        },
        minimizer: [
            // 对js文件进行压缩,在output之中设置了filename和chunkFilename之后，webpack4的默认压缩就无效了
            new UglifyJsPlugin({
                cache: true,
                test: /\.js($|\?)/i,
                parallel: true, // 启用多线程并行运行提高编译速度
                minify(file, sourceMap) {
                    const uglifyJsOptions = {
                        mangle: true, 
                        output: {
                            comments: false  // 删掉所有注释
                        },
                        compress: {
                            drop_console: true // 过滤console,即使写了console,线上也不显示
                        }
                    };
            
                    if (sourceMap) {
                        uglifyJsOptions.sourceMap = {
                            content: sourceMap,
                        };
                    }
                    return require('terser').minify(file, uglifyJsOptions);
                }
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
