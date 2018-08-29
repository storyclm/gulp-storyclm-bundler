/**
 * Билдует json:
 * beautifier
 * Выплевывает в temp
 */

'use strict';
const prettifyjs = require('gulp-js-prettify'); // форматирует js


module.exports = (gulp, plugins, file_path, options, path) => () => {
  return gulp.src((options.project + file_path.src.json))
          .pipe(prettifyjs({collapseWhitespace: true}))
          .pipe(gulp.dest(options.project + file_path.build.json))
};
