const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: ['./src/main.ts'],
  mode: 'development',
  output: {
    filename: 'main.[contenthash].js',
    path: path.resolve(__dirname, 'bin')
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // Extract css into files
          'css-loader'] // Turn css into commonjs
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  devServer: {
    watchContentBase: true,
    contentBase: path.join(__dirname, 'bin'),
    port: 9000
  }
}
