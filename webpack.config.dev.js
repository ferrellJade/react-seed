const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.babel');

const env = process.env;
const LOCAL_HOST = env.npm_package_server_local_host;
const LOCAL_PORT = env.npm_package_server_local_port;
const MOCK_HOST = env.npm_package_server_mock_host;
const MOCK_PORT = env.npm_package_server_mock_port;
const API_HOST = env.npm_package_server_api_host;
const API_PORT = env.npm_package_server_api_port;

module.exports = merge(commonConfig, {
    devtool: 'inline-source-map',
    mode: 'development',
    performance: {
        hints: false
    },
    module: {
        rules: [
            {
                // eslint代码规范校验
                test: /\.(js|jsx)$/,
                enforce: 'pre',
                include: path.join(__dirname, 'src'),
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        configFile: '.eslintrc.json'
                    }
                }]
            }
        ]
    },
    
    plugins: [
        // 出错继续运行
        new webpack.NoEmitOnErrorsPlugin(),
        // 全局变量
        new webpack.DefinePlugin({
            __DEV__: true
        })
    ],
    devServer: {
        host: LOCAL_HOST,
        port: LOCAL_PORT,
        disableHostCheck: true,
        inline: true,
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'build'),
        proxy: {
            '/mock': {  // '/mock'
                target: `http://${MOCK_HOST}:${MOCK_PORT}`,
                pathRewrite: {'^/mock': ''}
            },
            '/proxy': {   // '/api'
                target: `http://${API_HOST}:${API_PORT}`,
                pathRewrite: {'^/proxy': ''}
            }
        }
    }
});
