const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    world: "./tests/integration/world/src/index.ts"
  },
  devtool: "source-map",
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: __dirname,
    port: 8081
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  }
};
