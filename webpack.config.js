const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  devtool: "source-map",
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "IsometricWorld",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
