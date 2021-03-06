const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: './src/Index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		publicPath: 'dist/',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	optimization: {
		runtimeChunk: 'single',
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({ title: 'Juhodev', template: 'index.html' }),
		new webpack.ids.HashedModuleIdsPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(png|jp(e*)g|svg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[hash]-[name].[ext]',
						},
					},
				],
			},
		],
	},
	devServer: {
		contentBase: path.join(__dirname, './dist'),
		compress: true,
		historyApiFallback: true,
		host: '0.0.0.0',
		port: 8888,
	},

	devtool: 'cheap-module-source-map',
};
