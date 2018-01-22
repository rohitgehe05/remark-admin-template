import webpack from 'webpack';
import path from 'path';
import config from '../config';

// import PrettierPlugin from 'prettier-webpack-plugin';

export default {
  watch: false, // dynamically changed by gulp
  context: path.join(config.root, config.webpack.source),
  entry: {
    scripts: './scripts.js',
  },
  output: {
    path: path.join(config.root, config.webpack.build),
    filename: '[name].js',
    publicPath: 'js/',
  },
  // externals: [
  //   'jquery'
  // ],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: '[name].js',
      minChunks: Infinity,
    }),
    // uncomment in case of emergency code formatter need
    // new PrettierPlugin({
    //     printWidth: 80,
    //     tabWidth: 2
    // }),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      Base: path.resolve(config.paths.global, 'src/es/Base.js'),
      Component: path.resolve(config.paths.global, 'src/es/Component.js'),
      Config: path.resolve(config.paths.global, 'src/es/Config.js'),
      Plugin: path.resolve(config.paths.global, 'src/es/Plugin.js'),
      Menubar: path.resolve(config.scripts.source, 'Section/Menubar.js'),
      GridMenu: path.resolve(config.scripts.source, 'Section/GridMenu.js'),
      Sidebar: path.resolve(config.scripts.source, 'Section/Sidebar.js'),
      PageAside: path.resolve(config.scripts.source, 'Section/PageAside.js'),
      Site: path.resolve(config.scripts.source, 'Site.js'),
      BaseApp: path.resolve(config.scripts.source, 'BaseApp.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [path.resolve(config.root, 'node_modules')],
      }
    ],
  },
};
