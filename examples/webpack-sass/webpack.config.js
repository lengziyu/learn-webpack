var path = require('path');

module.exports = {
    entry: "./entry.js",

    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js"
    },

    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.scss$/, loader: 'style!css!sass'},
            
        ]
    }
}
