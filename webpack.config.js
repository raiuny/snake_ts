//引入一个包
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
//webpack中所有的配置信息都应该写在module.exports中
module.exports = {
    mode: "development",
    //指定入口文件
    entry: "./src/index.ts",
    //指定打包文件所在目录
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    devServer: {
        //实时重新加载
        host: "localhost",
        port: "8081",
        watchFiles: './src/**',
        compress: true, //启动gzip压缩
        open: true, //自动打开浏览器
        hot: true, //热更新
    },
    devtool: false,
    //指定webpack打包时要使用的模块
    module: {
        //指定要加载的瑞泽
        rules: [
            //指定规则生效的文件
            {
                test: /\.ts$/,
                //指定要使用的loader
                use: [{
                        loader: "babel-loader",
                        options: {
                            //设置预定义的环境
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: {
                                            chrome: "87",
                                        },
                                        corejs: "3",
                                        useBuiltIns: "usage",
                                    },
                                ],
                            ],
                        },
                    },
                    "ts-loader",
                ],
                //要排除的文件
                exclude: /node-modules/,
            },
            {
                //设置less文件的处理
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    //引入postcssloader
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [require("postcss-preset-env")()],
                                browsers: "last 2 versions",
                            },
                        },
                    },
                    "less-loader",
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    resolve: {
        //设置以ts和js结尾的文件均可以作为模块使用
        extensions: [".ts", ".js"],
    },
};