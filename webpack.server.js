const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/server/index.js",
  target: "node",
  externals: [nodeExternals()],
  output: {
    path: path.resolve("server-build"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["solid"] }
          },
          {
            loader: "ts-loader"
          }
        ]
      }
    ]
  }
};
