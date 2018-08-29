/**
 * Билдует html:
 * Склеивает шаблоны (если есть)
 * Подставляет ревизию для css и js
 * Выплевывает в temp
 */

'use strict';
const replace = require('gulp-replace'), // заменять строки по регулярному выражению или напрямую
  rev = require('gulp-rev-mtime'), // добавляет unixtime в качестве хеша ссылкам на статические файлы
  rigger = require('gulp-rigger'); // инклюдит файлы в другие файлы

module.exports = (gulp, plugins, file_path, options, path) => () => {
  return gulp.src((options.project + file_path.src.html)) //Выберем файлы по нужному пути
        .pipe(rigger())
        .pipe(rev({
            'cwd': options.project + '/'
        }))
        .pipe(gulp.dest((options.project + file_path.build.html))); //Выплюнем их в папку temp
};
