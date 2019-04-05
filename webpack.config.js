const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry : './src/js/index.js',
  output : {
      path: path.resolve(__dirname,'dist'),
      filename: 'js/bundle.js'

  },
  devServer : {
    contentBase : "./dist"
  },

  //This is to render the html file template
  plugins: [
    new HtmlWebpackPlugin({
      filename :  'index.html',
      template : './src/index.html'
     })
  ]   //plugins always get an array
};