const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const apiMocker = require('mocker-api');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = merge.merge(common, {
  mode: "development",
  devtool: "inline-source-map", //方便我们调试，定位源码
  devServer: {
    static: "../dist", //自动编译代码
    proxy: {
        "/api": {
            target: "http://127.0.0.1:4523/mock/543891",
            pathRewrite: {
                '/api': ''
            },
        }
    },
    // 配合mock模拟数据
    // onBeforeSetupMiddleware: function (devServer) {
    //     apiMocker(devServer.app, path.resolve('./mock/mocker.js'))
    //   }
  },
  plugins: [
    // 热更新的插件
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
});

