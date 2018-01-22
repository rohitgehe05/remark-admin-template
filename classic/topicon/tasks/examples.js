import gulp from 'gulp';
import notifier from 'node-notifier';
import config from '../config';
import './examples/scripts';
import './examples/styles';

gulp.task(
  'examples',
  gulp.series('examples:scripts', 'examples:styles', (done) => {
    if (config.enable.notify) {
      notifier.notify({
        title: config.notify.title,
        message: 'Examples task complete',
      });
    }

    done();
  })
);