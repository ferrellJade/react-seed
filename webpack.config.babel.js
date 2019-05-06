
const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackMd5Hash = require('webpack-md5-hash');
const devMode = process.env.NODE_ENV === 'production';

const STATIC_PATH = 'static';
console.log('99999999999999999999999', process.env.NODE_ENV,  devMode);
module.exports = {
    entry: { main: './src/index.jsx' },
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: `${STATIC_PATH}/js/[contenthash].[name].js`
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
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        babelrc: true,
                        plugins: [["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]]
                    }
                }]
            }, {
                test: /\.css$/,
                use: devMode ? [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ] : ['style-loader', 'css-loader']
            }, {
                test: /\.scss$/,
                exclude: devMode ? path.join(__dirname, 'src/images') : [/node_modules/],
                // exclude: [/node_modules/],
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
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? `${STATIC_PATH}/css/[contenthash:5].css` : '[id].css'
        }),
        // new OptimizeCSSAssetsPlugin({
        //     assetNameRegExp: /\.css$/g,
        //     cssProcessor: require('cssnano'),
        //     cssProcessorPluginOptions: {
        //         preset: ['default', {
        //             discardComments: {
        //                 removeAll: true
        //             },
        //             normalizeUnicode: false
        //         }]
        //     },
        //     canPrint: true
        // })
    ]
};
