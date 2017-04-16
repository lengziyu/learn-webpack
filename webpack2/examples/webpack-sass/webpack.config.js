const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //link方式引入样式

module.exports = {
  //入口的js
  entry: "./app",
  // 打包出来的js，会打包到./dist/bundle.js
  output: {
     path: path.resolve(__dirname, "dist"),
     filename: "bundle.js",
  },
  module: {
    rules: [
      //css和sass处理
      {
        test: /\.css|\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    //会把css和sass打包到style.css文件里
    new ExtractTextPlugin('style.css')
    //如果你想设置更多，可以这样写：
    //new ExtractTextPlugin({
    //  filename: 'style.css'
    //})
  ]
}
