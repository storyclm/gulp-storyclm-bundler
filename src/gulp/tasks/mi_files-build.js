/**
 * Билдует mi папки:
 * export.pdf, media, parameters.xml
 * Выплевывает в temp
 */

'use strict';

module.exports = (gulp, plugins, file_path, options, path) => () => {
  gulp.src((options.project + options.projectsSettings.mi.file_path.src.pdf))
        .pipe(gulp.dest(options.project + options.projectsSettings.mi.file_path.build.pdf));
    gulp.src((options.project + options.projectsSettings.mi.file_path.src.media))
        .pipe(gulp.dest(options.project + options.projectsSettings.mi.file_path.build.media));
    return gulp.src((options.project + options.projectsSettings.mi.file_path.src.parameters))
        .pipe(gulp.dest(options.project + options.projectsSettings.mi.file_path.build.parameters));
};
