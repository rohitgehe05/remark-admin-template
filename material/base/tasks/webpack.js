import gulp from 'gulp';
import config from '../config';
import eslint from 'gulp-eslint';
import gulpif from 'gulp-if';
import size from 'gulp-size';
import plumber from 'gulp-plumber';
import uglifyjs from 'uglify-js';
import composer from 'gulp-uglify/composer';
import webpack from 'webpack';
import browser from './browser';
import gutil from 'gulp-util';
import notifier from 'node-notifier';
import handleErrors from './utils/handleErrors';
import Glob from 'glob-fs';
import path from 'path';

// SCRIPTS
// ------------------
gulp.task('lint:webpack', () => {
  return gulp
    .src(`${config.webpack.source}/**/*.js`, {
      base: './',
      since: gulp.lastRun('lint:webpack'),
    })
    .pipe(eslint({fix: true})) // see http://eslint.org/docs/rules/
    .pipe(eslint.format())
    .pipe(gulp.dest('.'));
});

// compiles / concatenates javascript & minifies it (production)
let webpackConfig = config.production
  ? require('../webpack/prod.config.js')
  : require('../webpack/dev.config.js');

gulp.task('make:webpack', (done) => {
  webpack(webpackConfig).run((err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);

    gutil.log(
      '[webpack]',
      stats.toString({
        assets: true,
        chunks: false,
        chunkModules: false,
        colors: true,
        hash: false,
        timings: true,
        version: false,
      })
    );

    browser.reload();
    done();
  });
});

gulp.task(
  'webpack',
  gulp.series('lint:webpack', 'make:webpack', (done) => {
    if (config.enable.notify) {
      notifier.notify({
        title: config.notify.title,
        message: 'Webpack task complete',
      });
    }

    done();
  })
);
