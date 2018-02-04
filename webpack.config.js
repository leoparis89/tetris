const webpack = require('webpack');

const path = require('path');

module.exports = {
  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/Index'
    ]
  },
  output: {
    path: path.resolve('build/js'),
    publicPath: '/js',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'public',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      // In case you imported plugins individually, you must also require them here:
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
    })
  ],
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.css$/, 
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
};
