import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';
import webpackIsomorphicAssets from './webpack-isomorphic-assets';
import config from '../config';

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicAssets);
const {host, port:port} = config;
const rootDir = path.resolve(__dirname, '..');

export default {
  context: rootDir,
  entry: {
    'vendor': [
      'react', 'react-dom', 'react-router', 'redux', 'react-redux', 'react-router-redux',
      'redux-thunk', 'babel-polyfill'
    ],
    'main': 'index'
  },
  output: {
    path: path.resolve(rootDir, 'public/dist'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[chunkhash:8].js',
    publicPath: `http://${host}:${port}/dist/`
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap&localIdentName=[local]_[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=8192'
      }
    ]
  },
  postcss: () => [autoprefixer({browsers: ['last 2 versions', 'Android >= 2.3']})],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', minChunks: Infinity}),
    new ExtractTextPlugin('[name].[chunkhash:8].css', {allChunks: true}),
    new WebpackMd5Hash(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new CleanWebpackPlugin(['dist'], {
      root: path.join(rootDir, '/public'),
      verbose: true, 
      dry: false
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    webpackIsomorphicToolsPlugin
  ],
  resolve: {
    alias: {
      react: path.join(rootDir, 'node_modules', 'react')
    },
    extensions: ['', '.js'],
    root: path.join(rootDir, '/public/src'),
    modulesDirectories: ['node_modules']
  }
};