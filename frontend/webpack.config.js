const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.jsx',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({ 
      template: './public/index.html' 
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpe?g|gif|ico|woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
          }
        }],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  }
};
