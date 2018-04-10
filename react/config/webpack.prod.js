// webpack.prod.js
var webpack = require('webpack');
var path = require('path');
var helpers = require('./helpers');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',

    entry: "./src/index.js",

    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: '[name].js',
    },

    resolve: {
        alias: {
            "ag-grid-root" : "../node_modules/ag-grid"
        },
        extensions: ['.js', '.jsx']
    },

    mode: 'production',

    module: {
        rules: [
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.js$|\.jsx$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=[path]/[name].[ext]'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'config/index.html'
        })
    ],

    optimization: {
        namedModules: true,
        splitChunks: {
            name: 'vendor',
            minChunks: 2
        },
        noEmitOnErrors: true,
        concatenateModules: true
    }
};
