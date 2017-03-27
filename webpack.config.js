const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

const JSX_DIR = `${APP_DIR}/jsx`;
const LESS_DIR = `${APP_DIR}/less`;

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        'babel-polyfill',
        `${JSX_DIR}/index.jsx`,
        `${LESS_DIR}/main.less`
    ],
    output: {
        path: `${BUILD_DIR}/js`,
        filename: 'bundle.js',
        publicPath: './dist/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: APP_DIR,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                include: LESS_DIR,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '../css/style.css'
        }),
        new UglifyJsPlugin({
            comments: false
        })
    ]
};
