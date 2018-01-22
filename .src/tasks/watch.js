import gulp from 'gulp';
import config from '../config';
import browser from './browser';

// WATCH TASKS
// ------------------
// watches for changes, recompiles & injects html + assets
// @ifdef processCss
gulp.task('watch:styles', () => {
  gulp.watch(`${config.styles.source}/**/*.scss`, gulp.series('styles'));
});
// @endif

// @ifdef processJs
gulp.task('watch:scripts', () => {
  gulp.watch(`${config.scripts.source}/**/*.js`, gulp.series('scripts'));
});
// @endif

// @ifdef processImages
gulp.task('watch:images', () => {
  gulp.watch(`${config.images.source}/**/*`, gulp.series('images'));
});
// @endif

// @ifdef processHtml
gulp.task('watch:html', () => {
  gulp.watch(
    ['src/templates/**/*', 'config.js'],
    gulp.series('html', function(done) {
      browser.reload();
      done();
    })
  );
});
// @endif

gulp.task(
  'watch',
  gulp.parallel(
// @ifdef processCss
    'watch:styles',
// @endif
// @ifdef processJs
    'watch:scripts',
// @endif
// @ifdef processImages
    'watch:images',
// @endif
// @ifdef processHtml
    'watch:html'
// @endif
  )
);
