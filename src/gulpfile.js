'use strict';

const gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    file_path = require('./gulp/configs/main.config'),
    options = require('./gulp/configs/project.options'),
    register = require(`./gulp/utils/register`),
    path = require('path');

register(gulp, plugins, file_path, options, path)([
    'stock-watch',
    'image_classic',
    'image_2',
    'image-build',
    'html-build',
    'svg-build',
    'style-build',
    'fonts-build',
    'js-build',
    'json-build',
    'media-build',
    'minbuild_notifier',
    'webshot',
    'build_notifier',
    'auto-zip'
]);

// Открывает доступ по порту (шаблон StoryCLM) и вешает вотчер
gulp.task('sync', gulp.series('stock-watch'));

// Оптимизация картинок. сохраняем оптимизированные картинки в папке temp
gulp.task('img_compress', gulp.series('image_classic', 'image_2'));

// билдует без скриншотов для StoryCLM
gulp.task('minbuild', gulp.series('image-build', 'html-build', 'svg-build', 'style-build', 'fonts-build', 'js-build', 'json-build', 'media-build', 'minbuild_notifier'));

// билдует со скриншотами для StoryCLM
gulp.task('build', gulp.series('minbuild', 'webshot', 'build_notifier'));

// билдует и зипует пакет для StoryCLM
gulp.task('build-zip', gulp.series('image-build', 'html-build', 'svg-build', 'style-build', 'fonts-build', 'js-build', 'json-build', 'media-build', 'webshot', 'auto-zip', 'build_notifier'));