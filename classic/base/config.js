import pkg from './package';
import {argv} from 'yargs';
const production = argv.production || argv.prod || false;

export default {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  author: pkg.author,
  banner: `/**
* ${pkg.name} v${pkg.version}
* ${pkg.homepage}
*
* Copyright (c) ${pkg.author}
* Released under the ${pkg.license} license
*/
`,

  root: __dirname,
  paths: {
    source: 'src',
    build: 'html',
    global: "../global"
  },

  assets: {
    source: 'src/assets',
    build: 'assets'
  },

  examples: {
    source: 'src/examples',
    build: 'assets/examples'
  },

  enable: {
    notify: true
  },

  server: {
    port: 4000,
    notify: true,
    open: true,
    startPath: '/base/html/index.html'
  },

  styles: {
    source: 'src/scss',
    build: 'assets/css',
    include: [
      'src/scss',
      '../global/src/scss',
      '../global/src/scss/bootstrap',
      '../global/src/scss/mixins'
    ]
  },

  skins: {
    source: 'src/skins',
    build: 'assets/skins',
    include: [
      'src/skins/scss',
      '../global/src/skins',
      'src/scss',
      '../global/src/scss',
      '../global/src/scss/bootstrap',
      '../global/src/scss/mixins'
    ]
  },

  scripts: {
    source: 'src/es',
    build: 'assets/js'
  },

  webpack: {
    source: 'src/js',
    build: 'assets/js'
  },

  html: {
    pages: 'src/templates/pages',
    data: "src/templates/data",
    helpers: "src/templates/helpers",
    partials: "src/templates/partials",
    build: 'html',
    metadata: {
      production,
      pkg
    }
  },

  images: {
    source: 'src/images',
    build: 'assets/images'
  },

  notify: {
    title: pkg.name
  },

  env: 'development',
  production: production,
  setEnv: function(env) {
    if (typeof env !== 'string') return;
    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  }
};
