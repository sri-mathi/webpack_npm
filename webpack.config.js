import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import CopyWebpackPlugin from "copy-webpack-plugin";
import nodeExternals from 'webpack-node-externals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    module: true,
    library: {
      type: "module",
    },
    clean: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".svg"],
    fallback: { 
      process: "process/browser",
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader", 
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.svg$/i,
        issuer: { not: /\.[jt]sx?$/ },
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
      }
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets/*.svg", to: "assets/[name][ext]" },
      ],
    }),
  ],
  devtool: "source-map",
  mode: "production",
  target: "web",
  performance: {
    hints: false,
  },
  externals: [
    nodeExternals(), 
    { 
      react: 'react', 
      'react-dom': 'react-dom',
      'd3': 'd3',
      'zustand': 'zustand',
      'aws-amplify': 'aws-amplify'
    }
  ]
};