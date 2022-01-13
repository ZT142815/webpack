const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require("webpack");
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: "development",
  entry: {
    index: path.join(__dirname, "./index.js"),
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "[name].[contenthash].js",
    clean: true, //每次构建前清理dist文件夹
    charset: false,
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  devtool: "inline-source-map", //方便我们调试，定位源码
  resolve: {
    extensions: [".jsx", ".js"],
  },
  devServer: {
    static: "./dist", //自动编译代码
    hot: true,
  },
  module: {
    noParse: /jquery|lodash/,
    rules: [
      // 配置babel-loader
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, 
            // 解决第一次修改css自动刷新，第二次修改不刷新问题
          },
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            limit: 10240,
            name: "[name]-[hash].[ext]",
            outputPath: "assets",
          },
        },
      },
    ],
  },
  plugins: [
    // 将我们打包好的js代码动态的插入到html中
    new HtmlWebpackPlugin({
      titel: "development",
      template: "./index.html",
      filename: "index.html",
    }),
    // 抽离css文件
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    // 压缩抽离后的css文件,开发环境不需要做css压缩，后面放到生产环境
    new OptimizeCssPlugin(),

    // 热更新的插件
    new webpack.HotModuleReplacementPlugin(),
  ],
};
