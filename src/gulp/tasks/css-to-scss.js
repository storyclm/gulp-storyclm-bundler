'use strict';

module.exports = (gulp, plugins, file_path, options, path) => () => {
  return gulp.src((options.project + file_path.src.style))
        .pipe(cssScss())
        .pipe(gulp.dest(options.project + '/scss'));
};
