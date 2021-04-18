const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
// const webpack = require("webpack");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "./src/js/index.js"),
    //libs: ["lodash"],
  },
  output: {
    filename: "[name].[fullhash:8].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: 'img/[fullhash][ext][query]'
  },
  module: {
    rules: [
      {
        test: [/.js$/],
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: {
            list: [
              {
                tag: "img",
                attribute: "src",
                type: "src",
              },
              {
                tag: "img",
                attribute: "data-gallery-src",
                type: "src",
              },
            ],
          },
        },
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)$/i,
      //   use: {
      //     loader: "file-loader",
      //     options: {
      //       name: "img/[name].[hash:8].[ext]",
      //     },
      //   },
      // },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource'
      }
    ],
  },

  devServer: {
    port: 8080,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html",
    }),
  ],
};
