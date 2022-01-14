const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const resolvePathApp = require('./paths');

module.exports = {
    //開發模式
    mode: 'production',
    devtool: 'cheap-module-source-map',
    // target: 'web',// <=== 默认为 'web'，可省略

    //插件
    plugins: [],
    devServer: {
        static: {
            directory: resolvePathApp('public/index.html'),
        },
        //端口號
        port: 7777,
        host: '127.0.0.1',
        //熱更新
        hot: 'only',
        //壓縮
        compress: true,
        //自動開啟瀏覽器
        // open: true,
        //避免重新刷新時導致頁面404錯誤頁面產生---必須
        historyApiFallback: true,
        proxy: {
            /**
             *如果server或者api沒有/api路徑的話，這時必須要在pathRewrite，且在請求/api（這個可以自訂名稱）時必須加上/api/todos
             *讓代理知道目前要使用代理請求轉發目的（例如：https://jsonplaceholder.typicode.com）
             */
            '/api': {
                target: 'https://jsonplaceholder.typicode.com',
                //如果不希望傳遞/api，則需要重寫路徑
                pathRewrite: { '^/api': '' },
                //代理時會保留主機頭的來源，可以將 changeOrigin 設置為 true 以覆蓋此行為
                changeOrigin: true,
                //將不接受在 HTTPS 上運行且證書無效的後端服務器
                secure: false,
                // bypass: function (req, res, proxyOptions) {
                //     if (req.headers.accept.indexOf('html') !== -1) {
                //         // console.log(req, '??');
                //         console.log('Skipping proxy for browser request.');
                //         return '/index.html';
                //     }
                // },
            },
        },
    },
};
