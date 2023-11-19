const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

require('dotenv').config({
  path: path.resolve('.env'),
});

const plugins = [
  // new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, 'src/templates/index.html'),
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'src/public/'),
        to: path.resolve(__dirname, 'dist/'),
        // globOptions: {
        //   ignore: ['**/images/heros/**'],
        // },
      },
    ],
  }),
  new WorkboxWebpackPlugin.InjectManifest({
    swSrc: path.resolve(__dirname, 'src/scripts/sw.js'),
    swDest: './sw.bundle.js',
  }),
  new ImageminWebpackPlugin({
    plugins: [
      ImageminMozjpeg({
        quality: 150,
        progressive: true,
      }),
    ],
  }),
  new ImageminWebpWebpackPlugin({
    config: [
      {
        test: /\.(jpe?g|png)/,
        options: {
          quality: 50,
        },
      },
    ],
    overrideExtension: true,
  }),
  new webpack.DefinePlugin({
    'process.env': JSON.stringify(process.env),
  }),
  // Gunakan plugin BundleAnalyzer hanya saat mode produksi
  process.env.NODE_ENV === 'production' ? new BundleAnalyzerPlugin() : null,
].filter(Boolean);

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins,
};
