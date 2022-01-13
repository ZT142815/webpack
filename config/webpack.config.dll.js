const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        react: ['react'],
    },
    output: {
        filename: '[name].dll.[hash:6].js',
        path: path.resolve(__dirname,'../dist','dll'),
        library: '[name]_dll',  //暴露给外部使用
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]_dll',
            path: path.join(__dirname,'../dist','dll','manifest.json') //mainfest.json的生成路径
        })
    ]
}