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
    startPath: '/html/index.html'
  },

  styles: {
    source: 'src/scss',
    build: 'assets/css',
    include: [
      'src/scss',
      'src/scss/bootstrap',
      'src/scss/mixins'
      // 'node_modules'
    ]
  },
  
  skins: {
    source: 'src/skins',
    build: 'assets/skins',
    include: [
      'src/skins/scss',
      'src/skins',
      'src/scss',
      'src/scss/bootstrap',
      'src/scss/mixins'
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

  fonts: {
    source: 'src/fonts',
    build: 'assets/fonts'
  },

  images: {
    source: 'src/photos',
    build: 'assets/photos'
  },

  vendor: {
    source: 'src/vendor',
    manifest: 'manifest.json',
    dest: 'assets/vendor',
    verbose: true,
    override: true,
    ignoreError: false,
    flattenPackages: false,
    flattenTypes: false,
    flatten: false,
    dests: {
      images: "images",
      fonts: "",
      js: "",
      css: ""
    },
    paths: {
      css: 'src/vendor/${package}/src/${file}',
      coffee: 'src/vendor/${package}/${file}',
      es6: 'src/vendor/${package}/src/${file}',
      stylus: 'src/vendor/${package}/src/${file}',
      less: 'src/vendor/${package}/src/${file}',
      sass: 'src/vendor/${package}/src/${file}',
      scss: 'src/vendor/${package}/src/${file}'
    }
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
