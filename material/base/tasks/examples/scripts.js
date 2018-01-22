import gulp from 'gulp';
import config from '../../config';
import eslint from 'gulp-eslint';
import gulpif from 'gulp-if';
import size from 'gulp-size';
import plumber from 'gulp-plumber';
import uglifyjs from 'uglify-js';
import composer from 'gulp-uglify/composer';
import gutil from 'gulp-util';
import notify from 'gulp-notify';
import notifier from 'node-notifier';
import babel from 'gulp-babel';
import handleErrors from '../utils/handleErrors';
import rollup from 'gulp-rollup';
import header from 'gulp-header';
import Glob from 'glob-fs';
import path from 'path';
import del from 'del';

gulp.task('examples:scripts', (done) => {
  const uglify = composer(uglifyjs, console);
  const glob = Glob();
  const files = glob.readdirSync(path.join(config.examples.source, 'es/**/*.js'));

  const globals = {
    jquery: 'jQuery',
    Component: 'Component',
    Plugin: 'Plugin',
    Config: 'Config',
    Site: 'Site',
    GridMenu: "SectionGridMenu",
    Menubar: "SectionMenubar",
    PageAside: "SectionPageAside",
    Sidebar: "SectionSidebar"
  };

  const external = Object.keys(globals);

  return gulp
    .src(`${config.examples.source}/es/**/*.js`)
    .on('error', handleErrors)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(rollup({
      input: files,
      rollup: require('rollup'),
      allowRealFiles: true,
      globals: globals,
      external: external,
      format: 'es'
    }))
    .pipe(babel({
      babelrc: false,
      presets: [
        [
          'env'
        ]
      ],
      moduleRoot: '',
      moduleIds: true,
      plugins: [
        ["transform-es2015-modules-umd", {
          "globals": globals
        }],
        'transform-object-rest-spread',
        'transform-class-properties',
        'external-helpers'
      ]
    }))
    .pipe(gulpif(config.production, uglify()))
    .pipe(gulpif(config.production, header(config.banner)))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(gulp.dest(`${config.examples.build}/js`));
});
