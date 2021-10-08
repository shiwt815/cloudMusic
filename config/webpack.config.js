const path = require("path"); //调用node.js中的路径
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin"); //vue-loade
// const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: {
    index: "./src/index.js" //需要打包的文件
  },
  output: {
    filename: "build.js", //输入的文件名是什么，生成的文件名也是什么
    path: path.resolve(__dirname, "../dist") //指定生成的文件目录
    // publicPath: "./"
  },
  mode: "development",
  devServer: {
    static: "../dist"
    // port: 4000
  },
  plugins: [
    // 我们要把哪个目录下的 html 进行自动生成。
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
    // new VueLoaderPlugin(){ template: "./index.html" }
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,

        loader: "vue-loader"
      },
      {
        test: /\.js$/, // 使用正则来匹配 js 文件
        exclude: /node_modules/, // 排除依赖包文件夹
        use: {
          loader: "babel-loader" // 使用 babel-loader
        }
      },
      {
        test: /\.css$/,
        use: [
          // [style-loader](/loaders/style-loader)
          { loader: "style-loader" },
          // [css-loader](/loaders/css-loader)
          {
            loader: "css-loader"
            // options: {
            //   modules: true
            // }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8 * 1024,
              outputPath: "images/",
              name: "[name].[ext]",
              esModule: false
              //   name: "[hash:10].[ext]"
            }
          }
        ],
        type: "javascript/auto"
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  }
};
