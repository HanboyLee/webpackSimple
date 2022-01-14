module.exports = {
    presets: [
        //可以處理es6語法
        ['@babel/preset-env'],
        // 可以處理jsx語法
        ['@babel/preset-react'],
    ],
    //react 熱更新
    plugins: ['react-refresh/babel'],
};
