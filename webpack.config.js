const path = require('path');

module.exports = {
    entry: {
       app: './src/app.js'
    },
    output:{
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module:{
        rules:[{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    }
}