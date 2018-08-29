/**
 * Проверка на дублирование js-кода
 */

'use strict';

const jscpd = require('gulp-jscpd');
module.exports = (gulp, plugins, file_path, options, path) => () => {
  return gulp.src((options.project + file_path.src.js))
        .pipe(jscpd({
            'min-lines': 10,
            'verbose': true
        }));
};
