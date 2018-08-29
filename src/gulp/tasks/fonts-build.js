/**
 * Билдует fonts:
 * Выплевывает в temp
 */

'use strict';

module.exports = (gulp, plugins, file_path, options, path) => () => {
  return gulp.src((options.project + file_path.src.fonts)) //Выберем файлы по нужному пути
          .pipe(gulp.dest(options.project + file_path.build.fonts)); //Выплюнем их в папку temp
};
