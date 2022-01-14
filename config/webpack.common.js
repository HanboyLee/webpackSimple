const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const prodConfig = require('./webpack.prod');
const devConfig = require('./webpack.dev');
const webpack = require('webpack');
const resolvePathApp = require('./paths');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
    const isProduction = env.production || false;
    console.log(isProduction);
    const configMode = isProduction ? prodConfig : devConfig;
    const mergeConfig = merge(commonConfig, configMode);
    console.log(env);
    return mergeConfig;
};

const commonConfig = {
    //模塊解析規則
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.vue'],
    },
    //入口
    entry: './src/index.js',
    //出口
    output: {
        path: resolvePathApp('dist'),
        filename: 'bundle.js',
        //引入到html的script內的src //如果dev serve 也要設置話必須要一至不然會導致錯誤
        // publicPath: 'http:cdn.xxx.com',
    },
    module: {
        //規則引用
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'asset/',
                    limit: 2048,
                },
            },

            {
                test: /\.scss$/i,
                use: [
                    //從js字符串創建style節點
                    'style-loader',
                    //轉換css到commonJS，modules:true 為模塊化
                    { loader: 'css-loader', options: { modules: true } },
                    //兼容瀏覽器
                    'postcss-loader',
                    //編譯scss 到 css
                    'sass-loader',
                ],
            },
            {
                //問號代表也可以兼容js
                test: /\.jsx?/i,
                use: ['babel-loader'],
            },
        ],
    },
    //插件
    plugins: [
        //將html導出
        new HtmlWebpackPlugin({
            title: 'copyWebpackPlugin',
            template: resolvePathApp('public/index.html'),
        }),

        //清除上次打包的資料
        new CleanWebpackPlugin(),
        //Ｖ5版引入熱更新套件並在hot填寫only，舊版則在dev server填入hotOnly:true
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    globOptions: {
                        ignore: ['**/index.html'],
                    },
                },
            ],
        }),
    ],
};
