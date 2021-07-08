const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.tsx',
  },

  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx'],
  },

  output: {
    filename: 'index.js',
    path: path.join(__dirname + '/dist'),
  }, //출력

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
