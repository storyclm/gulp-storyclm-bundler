/**
 * Проверка ошибок в html
 */

'use strict';
const htmlhint = require('gulp-htmlhint');
module.exports = (gulp, plugins, file_path, options, path) => () => {
  return gulp.src((options.project + file_path.src.html))
          .pipe(htmlhint('.htmlhintrc'))
          .pipe(htmlhint.reporter())
};
