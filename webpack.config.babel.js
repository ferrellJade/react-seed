
const path = require('path');
const glob = require('glob');

const PurifyCssPlugin = require('purifycss-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const devMode = process.env.NODE_ENV === 'production';

const STATIC_PATH = 'static';

module.exports = {
    entry: { 
        main: './src/index.jsx',
        vendor: ['react', 'react-dom', 'react-router', 'babel-polyfill', 'react-css-modules']
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: `${STATIC_PATH}/js/[name].[contenthash:5].js`
    },
    resolve: {
        alias: {
            images: path.join(__dirname, 'src/images'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router')
        },
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.join(__dirname, 'src'),
                exclude: path.join(__dirname, 'src/fonts'),
                use: ['babel-loader', 'lazyload-loader']
            }, {
                test: /\.css$/,
                use: devMode ? [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ] : ['style-loader', 'css-loader']
            }, {
                test: /\.scss$/,
                exclude: [/node_modules/],
                use: devMode ? [
                    MiniCssExtractPlugin.loader,
                    'css-loader', 'postcss-loader', 'sass-loader'
                ] : ['style-loader', 'css-loader?modules&localIdentName=[name]-[hash:base64:5]', 'postcss-loader', 'sass-loader']
            }, {
                test: /\.(woff|eot|ttf|js|svg)$/,
                include: path.join(__dirname, 'src/fonts'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10,
                            name: `${STATIC_PATH}/fonts/[hash].[ext]`
                        }
                    }
                ]
                /**
                 * 图片加载器
                 */
            }, {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                include: path.join(__dirname, 'src/images'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10,
                            name: `${STATIC_PATH}/images/[hash].[ext]`
                        }
                    }
                ]
            }, {
                test: /\.ico$/,
                include: path.join(__dirname, 'src/images'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10,
                            name: `${STATIC_PATH}/images/[name].[ext]`
                        }
                    }
                ]
            }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: true,
            minify: {
                removeComments: true, // 移除注释
                collapseWhitespace: true, // 合并多余空格
                removeAttributeQuotes: true, // 移除分号
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            chunksSortMode: 'dependency'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? `${STATIC_PATH}/css/[contenthash:5].css` : '[id].css'
        }),
        // 不打包没有引用的css样式
        new PurifyCssPlugin ({
            paths: glob.sync(path.join(__dirname, '/*.html'))
        }),
        new OptimizeCSSAssetsPlugin ({
            assetNameRegExp: /\.(sa|sc|c)ss$/g, 
            // 指定一个优化css的处理器，默认cssnano
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
              preset: [  'default', {
                  discardComments: { removeAll: true}, // 对注释的处理
                  normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
              }]
            },
            canPrint: true  // 是否打印编译过程中的日志
        }),
        new CopyWebpackPlugin([
            {
                from: __dirname + '/src/fonts',
                to: `${STATIC_PATH}/fonts/`,
                toType: 'dir'
            },
            {
                from: __dirname + '/src/antdFont',
                to: `${STATIC_PATH}/antdFont/`,
                toType: 'dir'
            }
        ]),
        new CaseSensitivePathsPlugin()
    ]
};
