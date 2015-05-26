var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var buildPath = path.resolve(__dirname, 'public', 'dist');
var mainPath = path.resolve(__dirname, 'public', 'app', 'main.js');

var gitHead = '';
var gitRev = '';
var env = 'production';

/**
 * Detect git HEAD
 */
fs.readFile('./.git/HEAD', 'utf8', function (err, data) {
    if (err) {
        console.log(
            'Unable to read .git/HEAD',
            'The GIT_HEAD and GIT_REVISION constants will yield an empty string for this build.',
            err
        );
    } else {
        gitHead = data.split(': ').pop().trim();
    }
});

/**
 * Detect git HEAD rev
 */
if (gitHead.length > 0) {
    fs.readFile('./.git/' + gitHead, 'utf8', function (err, data) {
        if (err) {
            console.log(
                'Unable to read .git/' + gitHead,
                'The GIT_REVISION constant will yield an empty string for this build.',
                err
            );
        }

        gitRev = data.trim();
    });
}

module.exports = {
    entry: [mainPath],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /(node_modules|public\/components|public\/dist)/, loader: 'babel-loader' },
            { test: /\.less$/, loader: 'style-loader!css-loader!autoprefixer-loader!less-loader' }, // use ! to chain loaders
            { test: /\.(scss|sass)$/, loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader!autoprefixer-loader' },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=10240' } // inline base64 URLs for <=8k images, direct URLs for the rest
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: env,
            VERSION: JSON.stringify(require('./package.json').version),
            GIT_HEAD: gitHead,
            GIT_REVISION: gitRev
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'lodash',
            React: 'react'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })

    ]
};
