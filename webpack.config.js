const HtmlWebpackPlugin = require('html-webpack-plugin'); // Require  html-webpack-plugin plugin
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
// const DashboardPlugin = require('webpack-dashboard/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: ["babel-polyfill", __dirname + "/src/app/index.js"],
    resolve: {
        alias: {
            styles: path.resolve(__dirname, 'src/styles'),
            modules: path.resolve(__dirname, 'src/app/modules'),
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',  // Name of generated bundle after build
        chunkFilename: '[name].bundle.js',
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
        port: 8000, // port to run dev-server
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        }
    },

};

