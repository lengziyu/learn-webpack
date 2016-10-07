var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: "./entry.js",

    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js"
    },

    module: {

    },
    plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
    })
  ]
}
