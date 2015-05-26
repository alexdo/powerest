var webpack = require('webpack');
var fs = require('fs');

var gitHead = '';
var gitRev = '';

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
    entry: './public/app/main.js',
    //devtool: '#inline-source-map',
    output: {
        filename: './public/dist/bundle.js'
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
            VERSION: JSON.stringify(require('./package.json').version),
            GIT_HEAD: gitHead,
            GIT_REVISION: gitRev
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            _: 'lodash',
            React: 'react'
        })
    ]
};
