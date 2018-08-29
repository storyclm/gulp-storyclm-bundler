/**
 * Билдует veeva файлы:
 * *-thumb.png, *-full.png
 * Выплевывает в temp
 */

'use strict';

module.exports = (gulp, plugins, file_path, options, path) => () => {
  gulp.src((options.project + options.projectsSettings.veeva.file_path.src.thumbs))
        .pipe(gulp.dest(options.project + options.projectsSettings.veeva.file_path.build.thumbs));
};
