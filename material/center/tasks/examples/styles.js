import gulp from 'gulp';
import config from '../../config';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import size from 'gulp-size';
import stylelint from 'stylelint';
import postcss from 'gulp-postcss';
import syntaxScss from 'postcss-scss';
import reporter from 'postcss-reporter';
import notify from 'gulp-notify';
import notifier from 'node-notifier';
import header from 'gulp-header';
import minify from 'gulp-clean-css';
import rename from 'gulp-rename';

// Compiles sass into css & minifies it (production)
gulp.task('examples:styles', () => {
  return gulp
    .src(`${config.examples.source}/scss/**/*.scss`)
    .pipe(
      plumber({errorHandler: notify.onError('Error: <%= error.message %>')})
    )
    .pipe(
      sass({
        precision: 10, // https://github.com/sass/sass/issues/1122
        includePaths: config.styles.include,
      })
    )
    .pipe(postcss())
    .pipe(gulpif(config.production, header(config.banner)))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(gulp.dest(`${config.examples.build}/css`))
    .pipe(minify())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(size({gzip: true, showFiles: true}))
    .pipe(plumber.stop())
    .pipe(gulp.dest(`${config.examples.build}/css`));
});