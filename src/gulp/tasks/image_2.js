/**
 * Оптимизация картинок в папке img
 */
'use strict';

const size = require('gulp-size'),
  image = require('gulp-image'),
  prettyBytes = require('pretty-bytes'),
  notify = require('gulp-notify');

module.exports = (gulp, plugins, file_path, options, path) => () => {
  let img_2_size = size(),
          img_2_after_size = size();
      return gulp.src((options.project + file_path.src.img2)) //Выберем наши картинки
          .pipe(img_2_size)
          .pipe(image({ //Сожмем их
              pngquant: true,
              optipng: true
          }))
          .pipe(img_2_after_size)
          .pipe(gulp.dest(options.project + '/' + file_path.build.img2)) //сохраняем оптимизированные картинки в папке temp
          .pipe(notify({
              onLast: true,
              message: () => {
                  return 'Total image diff ' + prettyBytes(img_2_size.size - img_2_after_size.size);
              }
          }));
};
