const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); //link方式引入样式
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

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
          use: ['css-loader', 'sass-loader'],
        })
      },
      {
　　　　　　test: /\.(png|jpg)$/,
　　　　　　use: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
　　　　}
    ]
  },
  plugins: [
    //会把css和sass打包到style.css文件里
    new ExtractTextPlugin('style.css'),
    //如果你想设置更多，可以这样写：
    //new ExtractTextPlugin({
    //  filename: 'style.css'
    //})

    // 自动刷新插件
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['./'] }
    }),
    // 压缩插件 自带
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    }),

  ]
}
