# 使用webpack的提示和技巧【译】
这个是“我”所学到的一个关于Webpack使用的技巧。

所有的这些技巧关于Webpack 1版本的，与Webpack 2版本有不同的API，所以其中的一些技巧不可以运行。
关于迁移到v2的详细指南[can be found here.](http://javascriptplayground.com/blog/2016/10/moving-to-webpack-2/)

## 目录
- [显示进度条](#显示进度条)
- [压缩](#压缩)
- [打包多个入口](#打包多个入口)
- [分离主入口和第三方库](#分离主入口和第三方库)
- [追踪源 Source maps](#追踪源 Source maps)
- [CSS](#CSS)
- [开发模式](#开发模式)
- [包的大小限制](#包的大小限制)
- [小型的React配置](#小型的React配置)
- [小型的Lodash配置](#小型的Lodash配置)
- [要求所有的文件在一个文件夹中](#要求所有的文件在一个文件夹中)



显示进度条
--------
调用Webpack：
```
--progress --colors
```

压缩
---
使用 `-p` 调用Webpack生产构建。
```
webpack -p
```

打包多个入口
----------
打包多个入口设置output出口的 `[name].js`，这个例子生产出`a.js`和`b.js`：
```
module.exports = {
  entry: {
    a: './a',
    b: './b'
  },
  output: { filename: '[name].js' }
}
```
担心重复？使用这个[CommonsChunkPlugin](https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin)公共的部分转移到一个新的输出文件。
```
plugins: [ new webpack.optimize.CommonsChunkPlugin('init.js') ]
```

```
<script src='init.js'></script>
<script src='a.js'></script>
```


分离主入口和第三方库
----------------
使用 CommonsChunkPlugin 将第三方库移动到`vendor.js`
```
var webpack = require('webpack')

module.exports = {
  entry: {
    app: './app.js',
    vendor: ['jquery', 'underscore', ...]
  },

  output: {
    filename: '[name].js'
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor')
  ]
}
```
这个是怎样运行的：
- 我们做一个 `vendor` 入口点并加载它和一些第三方库；
- CommonsChunkPlugin 将把这些库从`app.js`移除（因为现在出现在两个包了）;
- CommonsChunkPlugin Webpack也将第三方库生产到`vendor.js`。
参考：[Code splitting](https://webpack.github.io/docs/code-splitting.html#split-app-and-vendor-code)


追踪源 Source maps
-----------------
追踪文件最好的来源`cheap-module-eval-source-map`，这可以在Chrome / Firefox开发工具查看源文件。它的速度比`source-map`和`eval-source-map`。
```
const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  debug: DEBUG ? true : false,
  devtool: DEBUG ? 'cheap-module-eval-source-map' : 'hidden-source-map'
}
```
现在你的文件将显示在 Chrome 开发工具如：`webpack:///foo.js?a93h`，我们希望更简洁些 `webpack:///path/to/foo.js`。
```
output: {
  devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]'
}
```
参考：[devtool documentation](https://webpack.github.io/docs/configuration.html#devtool)


CSS
---
这个比较复杂的。(骂粗

开发模式
------
想要一个只是出现在开发环境下的模式？
```
const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  debug: DEBUG ? true : false,
  devtool: DEBUG ? 'cheap-module-eval-source-map' : 'hidden-source-map'
}
```
一定要调用Webpack如：`env NODE_ENV=production webpack -p` 在构建到您的生产静态资源中。


包的大小限制
----------
想要看看依赖文件的最大值？使用webpack-bundle-size-analyzer.
```
$ yarn global add webpack-bundle-size-analyzer
```
```
$ ./node_modules/.bin/webpack --json | webpack-bundle-size-analyzer
jquery: 260.93 KB (37.1%)
moment: 137.34 KB (19.5%)
parsleyjs: 87.88 KB (12.5%)
bootstrap-sass: 68.07 KB (9.68%)
...
```
参考：[webpack-bundle-size-analyzer](https://github.com/robertknight/webpack-bundle-size-analyzer)


小型的React配置
--------------
React 将默认建立开发工具，你不需要在这个生产，使用DefinePlugin让这些开发工具消失。这样您可以节省大约 30 kb。
```
plugins: [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }
  })
]
```
一定要调用Webpack如：`env NODE_ENV=production webpack -p` 在构建到您的生产静态资源中。

小型的Lodash配置
--------------
[Lodash](https://lodash.com/)是非常有用的，但通常我们只需要它的全部功能的一小部分。
[lodash-webpack-plugin](https://github.com/lodash/lodash-webpack-plugin)可以帮助你缩小lodash
替换[特性集](https://github.com/lodash/lodash-webpack-plugin#feature-sets)构建模块与[noop](https://lodash.com/docs/4.17.2#noop),[identity](https://lodash.com/docs/4.17.2#identity),或简单的替代品。
```
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const config = {
  plugins: [
    new LodashModuleReplacementPlugin({
      path: true,
      flattening: true
    })
  ]
};
```
这可能为你节省大于10kb，lodash多大取决于你使用。


要求所有的文件在一个文件夹中
-----------------------
你曾经是否也想这样做?
```
require('./behaviors/*')  /* 不运行的 */
```

使用require.context。
```
// http://stackoverflow.com/a/30652110/873870
function requireAll (r) { r.keys().forEach(r) }

requireAll(require.context('./behaviors/', true, /\.js$/))
```
参考：[require.context](http://webpack.github.io/docs/context.html#require-context)

## 【译】
本文翻译来源来自：[webpack-tricks](https://github.com/rstacruz/webpack-tricks)。

如翻译有误，欢迎PR。
