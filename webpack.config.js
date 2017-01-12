const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');

const JSX_DIR = `${APP_DIR}/jsx`;

module.exports = {
    entry: `${JSX_DIR}/index.jsx`,
    output: {
        path: `${BUILD_DIR}/js`,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel'
            }
        ]
    }
};
