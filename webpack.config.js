const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",// 开发环境配置
    entry:
        "./src/index.js"
    ,
    output: {
        // 输出目录
        path: path.resolve(__dirname, "dist"),
        // 文件名称
        filename: "bundle.js"
    },
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, "./dist"),
        // host: "0.0.0.0", // 可以使用手机访问
        port: 8082,
        open: true
        // historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
        // proxy: {
        //     // 代理到后端的服务地址，会拦截所有以api开头的请求地址
        //     "/api": "http://localhost:3000"
        // }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss/, // 把scss转为webpack可识别的模块
                loaders: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            sourceMap: true,
                            modules: true,
                            //  localIdentName: "[local]___[hash:base64:5]"
                        },
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/', // 图片输出的路径
                        limit: 10 * 1024
                    }
                }
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].min.[ext]',
                            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                            publicPath: 'fonts/',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 最终创建的文件名
            template: path.resolve(__dirname, 'src/index.html') // 指定模板路径
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
}