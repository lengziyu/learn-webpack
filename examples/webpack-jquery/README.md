## webpack-jquery

在 webpack 全局配置 jquery


在插件项目配置
```
plugins: [
new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
})
]
```
使用
```
var $ = require('jquery');
```
