
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackMd5Hash = require('webpack-md5-hash');

const STATIC_PATH = 'static';

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
        extensions: ['.js', '.jsx', '.css', '.scss', '.less']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // presets: ['@babel/preset-env', '@babel/react'],
                        // plugins: [
                        //     [require('@babel/plugin-proposal-decorators'), { 'legacy': true }]
                        // ]
                    }
                }
            }, {
                test: /\.(css|scss)$/,
                use: [   
                    'style-loader', 
                    MiniCssExtractPlugin.loader, 
                    'css-loader', 'postcss-loader', 
                    'sass-loader'
                ]
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
            filename: `${STATIC_PATH}/css/[name].[contenthash:5].css`
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
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
        // new WebpackMd5Hash()
    ]
};
