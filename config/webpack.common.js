const webpack = require("webpack");
const path = require("path");

//生成index.html模版插件
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 抽离css文件插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//输出打包速度日志
const speedMeasure = require("speed-measure-webpack-plugin");
const smp = new speedMeasure();

// 打包进度条插件
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

// 自定义插件
const chalk = require("chalk");
const CompressAssetsPlugin = require("./plugin");

// 打包报错弹框
// const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// const notifier = require('node-notifier')
// notifier.notify('Message');
// const icon = path.join(__dirname,'../assets/images/img.png')

// const Happypack = require("happypack");

const loaderPath = path.resolve(__dirname, "../loaders");

const common = {
  // 打包入口
  entry: {
    index: path.join(__dirname, "../src/index.js"),
  },
  //打包输出
  output: {
    path: path.join(__dirname, "../dist"), //输出路径
    filename: "[name].[contenthash].js", //输出文件名称
    clean: {
      keep: /dll/, //打包前清空之前的打包
    }, //每次构建前清理dist文件夹
    charset: false,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".less"],
    // alias: {react}, //指定查找名称
    modules: ["node_modules"], //指定查找目录
  },
  resolveLoader: {
    modules: [loaderPath, "node_modules"], //创建自己的loader
  },
  externals: {
    //防止某些包打包到bundle中，比如从cdn引入的jquery
    jquery: "jQuery",
  },
  //配置cache用于二次构建加载速度
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  // 抽离公共代码
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 第三方依赖
          priority: 1, //设置优先级
          name: "vendor",
          test: /node_modules/,
          chunks: "initial",
          minSize: 0,
          minChunks: 1,
        },
        // 缓存组
        default: {
          // 公共模块
          name: "common",
          chunks: "initial",
          minChunks: 3,
        },
      },
    },
  },
  module: {
    rules: [
      {
        oneOf: [
          //oneOf之匹配一个，匹配到了就不往后找了
          // 配置babel-loader
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            include: [path.resolve(__dirname, "../src")],
            use: [
              // {
              //   loader: "cache-loader",
              //   options: {
              //     workers: 3, //thread-loader开启线程池，开线程和线程通讯都需要时间
              //   },
              // },
              { loader: "log-loader" },
              {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env", "@babel/preset-react"],
                },
              },
            ],
          },
          {
            test: /\.(css|less)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  // 这里可以指定一个 publicPath
                  // 默认使用 webpackOptions.output中的publicPath
                  publicPath: "../",
                },
              },
              "css-loader",
              "postcss-loader",
              "less-loader",
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
          // {
          //   test: /\.txt?$/,
          //   use: {
          //     loader: "../loaders/my-loader.js",
          //   },
          // },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    // 将我们打包好的js代码动态的插入到html中
    new HtmlWebpackPlugin({
      titel: "development",
      template: "./index.html",
      filename: "index.html",
    }),
    // 构建进度条
    new ProgressBarPlugin({
      width: 200,
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
      clear: false,
    }),

    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: path.resolve(__dirname, "../dist/dll/manifest.json"),
    }),

    new CompressAssetsPlugin({
      output: "result.zip",
    }),
    // new friendlyErrorsWebpackPlugin({
    //   onErrors: (severity,errors) => {
    //     console.log(123123,errors[0])
    //     let error = errors[0];
    //     notifier.notify({
    //       title: 'webpack编译失败',
    //       message: severity+':'+error.name,
    //       subtitle:error.file || '',
    //       title: icon
    //     })
    //   }
    // })

    // 定义环境变量
    // new webpack.DefinePlugin({
    //   DEV: JSON.stringify("dev"),
    // }),

    // 项目不复杂的时候不需要用，因为进程的分配和管理也需要消耗时间
    // new Happypack({
    //   id: "js", //和rule中的id=js对应
    //   //将之前 rule 中的 loader 在此配置
    //   use: [
    //     { loader: "cache-loader" },
    //     {
    //       loader: "babel-loader",
    //       options: {
    //         presets: ["@babel/preset-env", "@babel/preset-react"],
    //       },
    //     },
    //   ], //必须是数组
    // }),
  ],
};

module.exports = smp.wrap(common);
