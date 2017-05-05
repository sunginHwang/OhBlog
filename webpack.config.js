var webpack = require('webpack');

/*
 * Default webpack configuration for development
 */
var config = {

  devtool: 'eval-source-map',
  entry:  [
    __dirname + "/app/src/routes.js",
  ],
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['es2015','react','stage-2'],
        plugins: ['transform-decorators-legacy']
      }
    },
      {test : /\.css$/, loader: "style!css"},
      {test : /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url'}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "require.specified": "require.resolve"
    })
  ],
  externals: {
    "jQuery": "jQuery",
    "$": "jquery"
  },
  devServer: {
    contentBase: "./public",
    colors: true,
    port: 8004,
    historyApiFallback: true,
    inline: true
  },
}

/*
 * If bundling for production, optimize output
 */
if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ];
};

module.exports = config;
