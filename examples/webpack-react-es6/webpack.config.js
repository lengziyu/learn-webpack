var path = require('path');

module.exports = {
    entry: './entry.js',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js'
    },
    module: {
       loaders: [
         {
           test: /(\.jsx|\.js)$/,
           loader: 'babel',
           exclude: /(node_modules|bower_components)/,
           query: {
             presets: ['react', 'es2015']
           }
         }
       ]
     },
     resolve: {
       root: path.resolve('./'),
       extensions: ['', '.js', '.jsx']
     }
}
