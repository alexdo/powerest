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
    }
};
