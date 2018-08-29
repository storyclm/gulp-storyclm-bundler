/**
 * Билдует communicate папки:
 * resources, previews
 * Выплевывает в temp
 */

'use strict';

const replace = require('gulp-replace'), // заменять строки по регулярному выражению или напрямую
  rigger = require('gulp-rigger'); // инклюдит файлы в другие файлы

module.exports = (gulp, plugins, file_path, options, path) => () => {
  gulp.src((options.project + options.projectsSettings.communicate.file_path.src.resources))
          .pipe(gulp.dest(options.project + options.projectsSettings.communicate.file_path.build.resources));
      gulp.src((options.project + options.projectsSettings.communicate.file_path.src.previews))
          .pipe(gulp.dest(options.project + options.projectsSettings.communicate.file_path.build.previews));
      gulp.src((options.project + options.projectsSettings.communicate.file_path.src.previewImage))
          .pipe(gulp.dest(options.project + options.projectsSettings.communicate.file_path.build.previewImage));

      return gulp.src((options.project + options.projectsSettings.communicate.file_path.src.slidesFolder))
          .pipe(rigger())
          .pipe(replace(/<div id="[a-zA-Z0-9-_]*layer-0"><\/div>/g, ' ', {
              skipBinary: true
          }))
          .pipe(gulp.dest(options.project + options.projectsSettings.communicate.file_path.build.slidesFolder));
};
