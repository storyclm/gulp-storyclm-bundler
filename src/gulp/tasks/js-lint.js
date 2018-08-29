/**
 * Проверка ошибок в js
 */

'use strict';
const jshint = require('gulp-jshint');
module.exports = (gulp, plugins, file_path, options, path) => () => {
  return gulp.src((options.project + file_path.src.js))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
};
