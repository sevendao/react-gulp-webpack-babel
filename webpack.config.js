'use strict';

var path = require('path');
var webpack = require('webpack');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

// global css
loaders.push({
	test: /\.css$/,
	exclude: /[\/\\]src[\/\\]/,
	loaders: [
		'style?sourceMap',
		'css'
	]
});
// local scss modules
loaders.push({
	test: /\.scss$/,
	exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
	loaders: [
		'style?sourceMap',
		'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
		'postcss',
		'sass'
	]
});

// local css modules
loaders.push({
	test: /\.css$/,
	exclude: /[\/\\](node_modules|bower_components|public)[\/\\]/,
	loaders: [
		'style?sourceMap',
		'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
	]
});

module.exports = {
  entry: [
    'webpack/hot/dev-server',
    path.resolve(__dirname, './src/index.jsx')
  ],
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: 'http://127.0.0.1:8888/build',
    filename: 'scripts/bundle.js',
  },
  module: {
    loaders
  },
  resolve: {
		extensions: ['', '.js', '.jsx']
	},
  devServer: {
    hot: true,
    noInfo: false,
    inline: true,
    historyApiFallback: true,
    port: PORT,
		host: HOST
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
  ]
};