/**
 * Created by rbmenke on 1/19/17.
 */
const webpack = require("webpack");
const path    = require("path");
const glob    = require("glob");

module.exports = {
    entry    : {
        bundle: './src/js/main.js'
        // demo : './examples/src/demo.js'
    },
    // devtool : '#inline-source-map',
    cache    : true,
    output   : {
        path    : './src',
        filename: '[name].js'
    },
    devtool  : '#inline-source-map',
    module   : {
        loaders: [
            {
                test  : /\.js$/,
                loader: "babel-loader?presets[]=es2015"
                // include : path.join(__dirname, 'lib')
            }
        ]
    },
    plugins  : [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
};