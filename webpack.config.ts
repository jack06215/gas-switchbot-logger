/* eslint-disable @typescript-eslint/no-unused-vars */
import { Configuration } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import * as path from "path";
import * as GasPlugin from "gas-webpack-plugin";
import * as CopyPlugin from "copy-webpack-plugin";

const config: Configuration = {
  entry: "./src/main.ts",
  mode: "production",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new GasPlugin(),
    new CopyPlugin({
      patterns: [{ from: "./src/appsscript.json" }, { from: "./secret/.clasp.json" }],
    }),
    // new BundleAnalyzerPlugin(),
  ],
};

export default config;
