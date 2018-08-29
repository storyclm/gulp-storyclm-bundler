/**
 * Проверка ошибок в json
 */
'use strict';
const jsonlint = require('gulp-jsonlint'),
notify = require('gulp-notify');;
module.exports = (gulp, plugins, file_path, options, path) => () => {
  return gulp.src((options.project + file_path.src.json))
        .pipe(jsonlint())
        .pipe(notify((file) => {
            if (file.jsonlint.success) {
                return false;
            }
            return file.path + ' is not valid JSON.';
        }));
};
