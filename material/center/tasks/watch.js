import gulp from 'gulp';
import config from '../config';
import browser from './browser';

// WATCH TASKS
// ------------------
// watches for changes, recompiles & injects html + assets
gulp.task('watch:styles', () => {
  gulp.watch(`${config.styles.source}/**/*.scss`, gulp.series('styles'));
});

gulp.task('watch:scripts', () => {
  gulp.watch(`${config.scripts.source}/**/*.js`, gulp.series('scripts'));
});

gulp.task('watch:images', () => {
  gulp.watch(`${config.images.source}/**/*`, gulp.series('images'));
});

gulp.task('watch:html', () => {
  gulp.watch(
    ['src/templates/**/*', 'config.js'],
    gulp.series('html', function(done) {
      browser.reload();
      done();
    })
  );
});

gulp.task('watch:misc', () => {
  gulp.watch(
    ['config.js'],
    gulp.series('html', 'styles', 'scripts')
  );
});

gulp.task(
  'watch',
  gulp.parallel(
    'watch:styles',
    'watch:scripts',
    'watch:images',
    'watch:html',
    'watch:misc'
  )
);
