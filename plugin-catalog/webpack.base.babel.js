/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const port = 3001;

export default {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: path.join(__dirname, 'src', 'index.js'),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      /** ==> For all .css files in node_modules */
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          // { loader: 'css-loader', options: { camelCase: true } },
        ],
      },
      /** <== For all .css files in node_modules */
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream',
        },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml',
        },
      },
    ],
  },

  /*
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '__dist'),
  },
  */
  output: {
    publicPath: `http://localhost:${port}/`,
  },
  devServer: {
    port,
    historyApiFallback: true,
    client: {
      overlay: false,
    },
    /** ---> Workaround CORS issue for host hot reload */
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    /** <--- Workaround CORS issue for host hot reload */
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      inject: 'body',
      hash: true,
    }),
    new ModuleFederationPlugin({
      name: 'plugin_catalog',
      filename: 'pluginCatalogEntry.js',
      exposes: {
        './contributions': './src/contributions.js',
        './Routes': './src/Routes',
        './Reducers': './src/reducers',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^17.0.2' },
        'react-dom': { singleton: true, requiredVersion: '^17.0.2' },
        'react-redux': { singleton: true, requiredVersion: '^7.2.5' },
        redux: { singleton: true, requiredVersion: '^4.1.1' },
        'redux-logger': { singleton: true, requiredVersion: '^3.0.6' },
        '@material-ui/core': { singleton: true, requiredVersion: '^4.12.3' },
        '@material-ui/lab': { singleton: true, requiredVersion: '^4.0.0-alpha.60' },
        'react-router-dom': { singleton: true, requiredVersion: '^5.3.0' },
        'redux-thunk': { singleton: true, requiredVersion: '^2.3.0' },
      },
    }),
  ],
};
