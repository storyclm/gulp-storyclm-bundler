/**
 * Билдует js:
 * beautifier
 * Выплевывает в temp
 */

'use strict';
const prettifyjs = require('gulp-js-prettify'); // форматирует js


module.exports = (gulp, plugins, file_path, options, path) => () => {
  return gulp.src((options.project + file_path.src.js)) //Выберем файлы по нужному пути
          // .pipe(prettifyjs({collapseWhitespace: true}))
          .pipe(gulp.dest(options.project + file_path.build.js)); //Выплюнем их в папку temp
};
