/**
 * Билдует styles:
 * Проставляет префиксы
 * beautifier
 * Выплевывает в temp
 */

'use strict';
const prefixer = require('gulp-autoprefixer'), // расставляет префиксы в css
  cssbeautify = require('gulp-cssbeautify'), // форматирует css
  makeUrlVer = require('gulp-make-css-url-version'); // добавляет хеши ссылкам на изображения


module.exports = (gulp, plugins, file_path, options, path) => () => {
  return gulp.src((options.project + file_path.src.style)) //Выберем наш main.scss
        .pipe(makeUrlVer({
            useDate: true,
            format: 'MdhmsS'
        }))
        .pipe(prefixer({
            browsers: ['iOS 6.1']   // TODO: разобраться как добавлять -webkit- к keyframes
        })) //Добавим вендорные префиксы
        .pipe(cssbeautify())
        .pipe(gulp.dest(options.project + file_path.build.css));
};
