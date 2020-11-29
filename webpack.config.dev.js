const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	plugins: [
		new HtmlWebpackPlugin({ title: 'Baavo', template: 'index.html' }),
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
