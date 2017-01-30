const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

const JSX_DIR = `${APP_DIR}/jsx`;
const LESS_DIR = `${APP_DIR}/less`;

module.exports = {
    entry: [
        `${JSX_DIR}/index.jsx`,
        `${LESS_DIR}/main.less`
    ],
    output: {
        path: `${BUILD_DIR}/js`,
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                exclude: /less/,
                loader: 'babel'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('../css/style.css')
    ]
};
