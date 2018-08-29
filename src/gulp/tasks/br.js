/**
 * Исправление невалидных br-тегов
 */
'use strict';

module.exports = (gulp, plugins, file_path, options, path) => () => {
  gulp.src([(options.project + file_path.src.html)])
        .pipe(replace('</br>', '<br>', {
            skipBinary: true
        }))
        .pipe(gulp.dest((options.project + file_path.build.html)));
};
