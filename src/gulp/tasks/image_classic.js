/**
 * Оптимизация картинок в папке images
 */

'use strict';

const size = require('gulp-size'),
  image = require('gulp-image'),
  prettyBytes = require('pretty-bytes'),
  notify = require('gulp-notify');

module.exports = (gulp, plugins, file_path, options, path) => () => {
  let img_classic_size = size(),
    img_classic_after_size = size();
  return gulp.src((options.project + file_path.src.img)). //Выберем наши картинки
  pipe(img_classic_size).pipe(image({ //Сожмем их
    pngquant: true,
    optipng: true
  })).pipe(img_classic_after_size).pipe(gulp.dest(options.project + '/' + file_path.build.img))
  .pipe(notify({
    onLast: true,
    message: () => {
      return 'Total image diff ' + prettyBytes(img_classic_size.size - img_classic_after_size.size);
    }
  })); //сохраняем оптимизированные картинки в папке temp
};
