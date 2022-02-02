const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
		main : path.resolve(__dirname, './src/index.jsx')
	},
    output: {
        filename : 'main.js',
        path:path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    resolve:{
      extensions: ['.js','.jsx'],
    },
    plugins: [new HtmlWebpackPlugin({ template: './index.html'})],
    module:{
        rules: [
      {
      // .js나 .jsx 확장자로 끝나는파일은 babel-loader가 처리하도록 설정  
        test: /\.jsx?$/,
      
      // 사용하는 third-party 라이브러리가 많을수록 babel-loader가 느려질 수도 있으므로 node_modules 폴더는 예외처리
        exclude: /node_modules/,
      
      // 바벨 로더 추가  
        loader: "babel-loader", 
      },
    ],
    },
    devServer: {
      historyApiFallback: true,
      // historyApiFallback: {
      //   index: 'index.html',
      // }
    }
}