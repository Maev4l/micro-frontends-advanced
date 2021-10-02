/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import ModuleFederationPlugin from 'webpack/lib/container/ModuleFederationPlugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const port = 3003;

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
    new ModuleFederationPlugin({
      name: 'plugin_user',
      filename: 'pluginUserEntry.js',
      exposes: {
        './User': './src/UserMenu.jsx',
        './Routes': './src/Routes.jsx',
        './contributions': './src/contributions.js',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^17.0.2' },
        'react-dom': { singleton: true, requiredVersion: '^17.0.2' },
        '@material-ui/core': { singleton: true, requiredVersion: '^4.12.3' },
        '@material-ui/lab': { singleton: true, requiredVersion: '^4.0.0-alpha.60' },
        'react-router-dom': { singleton: true, requiredVersion: '^5.3.0' },
        '@material-ui/icons': { singleton: true, requiredVersion: '^4.11.2' },
      },
    }),
  ],
};