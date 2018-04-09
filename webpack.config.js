const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
// const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: __dirname + "/src/app/index.js", // webpack entry point. Module to start building dependency graph
    resolve: {
        alias: {
            styles: path.resolve(__dirname, 'src/styles'),
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',  // Name of generated bundle after build
        publicPath: '/' // public URL of the output directory when referenced in a browser
    },
    module: {  // where we defined file patterns and their loaders
        rules: [
            { test: /\.txt$/, use: 'raw-loader' },
            { test: /\.js$/, use: 'babel-loader', exclude: [ /node_modules/ ] },
            { test: /\.css$/, use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }] }
        ]
    },
    plugins: [  // Array of plugins to apply to build chunk
        new HtmlWebpackPlugin({
            template: __dirname + "/src/public/index.html",
            inject: 'body'
        }),
        new ExtractTextPlugin("styles.css"), // extract css to a separate file called styles.css
        // new webpack.optimize.minimize(),
        // new DashboardPlugin()
    ],
    devServer: {  // configuration for webpack-dev-server
        contentBase: './src/public',  //source of static assets
        port: 7700, // port to run dev-server
    } 
};

