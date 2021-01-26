const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './client/src'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, './client/public'),
    filename: 'bundle.js',
  },
  devServer: {
    publicPath: '/',
    contentBase: path.resolve(__dirname, './client/public'),
  },
};
