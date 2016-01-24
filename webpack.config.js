var path = require( 'path' );
var webpack = require( 'webpack' );
var NODE_ENV = process.env.NODE_ENV || 'development';
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var autoprefixer = require( 'autoprefixer' );

var webpackConfig = {
	entry: path.join( __dirname, 'javascript', 'index.jsx' ),
	output: {
		path: path.join( __dirname, 'javascript' ),
		filename: "front-end.js"
	},
	devtool: '#source-map',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					cacheDirectory: true,
					presets: [ 'es2015', 'react' ]
				}
			},
			{
				test: /\.json$/,
				loader: require.resolve('json-loader')
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract( 'style-loader', 'css!postcss!sass' )
			}
		]
	},
	postcss: function () {
		return [ autoprefixer ];
	},
	resolve: {
		extensions: [ '', '.js', '.jsx' ],
	},
	node: {
		fs: "empty",
		process: true
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify( NODE_ENV )
			}
		}),
		new ExtractTextPlugin( '../css/style.css' )
	]
};

if ( NODE_ENV === 'production' ) {
	webpackConfig.plugins.push( new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	}) );
}

module.exports = webpackConfig;
