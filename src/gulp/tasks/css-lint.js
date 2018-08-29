/**
 * Проверка ошибок в css
 */

'use strict';
const csslint = require('gulp-csslint'),
notify = require('gulp-notify');
module.exports = (gulp, plugins, file_path, options, path) => () => {
  return gulp.src((options.project + file_path.src.style))
        .pipe(csslint('.csslintrc'))
        .pipe(notify((file) => {
            if (file.csslint.success) {
                return false;
            }
            var errors = file.csslint.results.map((data) => {
                return data.error.message + ' on line ' + data.error.line;
            }).join("\n");

            return file.csslint.errorCount + ' errors in ' + file.path + ':' + errors;
        }));
};
