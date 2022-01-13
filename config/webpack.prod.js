const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const prod = merge.merge(common, {
  mode: "production",
  plugins: [
    // 压缩抽离后的css文件,开发环境不需要做css压缩，后面放到生产环境
    new OptimizeCssPlugin(),
  ],
});

// module.exports = smp.wrap(prod)
module.exports = prod;
