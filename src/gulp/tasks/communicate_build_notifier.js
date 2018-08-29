'use strict';

const notifyConfig = require('../configs/notify.config'),
notify = require('gulp-notify'); // показывает уведомления в системных попапах;

module.exports = (gulp, plugins, file_path, options, path) => () => {
  return gulp.src(options.project).pipe(notify({
      onLast: true,
      message: () => {
          return 'Communicate Project has been built!'
      }
  }));
};
