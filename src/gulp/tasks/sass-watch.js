'use strict';

module.exports = (gulp, plugins, file_path, options, path) => () => {
  gulp.watch((options.project + 'scss/*.*'), gulp.series('scss-to-css'));
};
