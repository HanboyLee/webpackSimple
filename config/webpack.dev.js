const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const resolvePathApp = require('./paths');
module.exports = {
    //開發模式
    mode: 'development',
    //入口
    entry: './src/index.js',
    //出口
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        //引入到html的script內的src //如果dev serve 也要設置話必須要一至不然會導致錯誤
        // publicPath: 'http:cdn.xxx.com',
    },
    /**
     * 選擇一種 source map 風格來增強調試過程。不同的值會明顯影響到構建(build)和重新構建(rebuild)的速度。
     *當在開發環境下：注意是開發環境，下如果要debvug查詢哪個檔案第幾行錯誤的話，可以將下列devtool:
        開發環境下 eval-cheap-module-source-map
        線上環境下 cheap-module-source-map
    */
    devtool: 'eval-cheap-module-source-map',
    // target: 'web',// <=== 默认为 'web'，可省略
    //插件
    plugins: [new ReactRefreshWebpackPlugin()],
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
