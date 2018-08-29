'use strict';

const gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    file_path = require('./gulp/configs/main.config'),
    options = require('./gulp/configs/project.options'),
    register = require(`./gulp/utils/register`),
    path = require('path');

// список подключаемых тасок-модулей
register(gulp, plugins, file_path, options, path)([
    'auto-zip',
    'br',
    'cm_files-build',
    'css-lint',
    'css-to-scss',
    'folders-zip',
    'fonts-build',
    'html-build',
    'svg-build',
    'html-lint',
    'image-build',
    'image_2',
    'image_classic',
    'js-build',
    'js-lint',
    'jscpd',
    'json-build',
    'json-lint',
    'media-build',
    'mi_files-build',
    'sass-watch',
    'scss-to-css',
    'sequence-watch',
    'stock-watch',
    'style-build',
    'veeva_files-build',
    'webshot',
    'minbuild_notifier',
    'build_notifier',
    'communicate_build_notifier',
    'mi_build_notifier',
    'veeva_build_notifier',
    'build_zip_notifier',
    'mi_build_zip_notifier',
    'veeva_build_zip_notifier',
    'cm_build_zip_notifier',
    'mi_template',
    'pre_mm',
    'mm_to_json',
    'json_folders',
    'add_dublicate',
    'mi_sequence_srcs',
    'isales_sequence_srcs',
    'mi_screens',
    'mi_thumbs',
    'mi_mega_build',
    'mi_mega_zip',
    'meta_clm',
    'nestle_custom',
    'isales_json_folders',
    'isales_screens',
    'isales_thumbs',
    'isales_custom',
    'isales_mega_build',
    'isales_mega_zip',
    'veeva_mega_build',
    'veeva_mega_zip'
]);


// для готовых секвенсов создает 200*150.jpg и export.pdf (для всех секвенсов; сам закидывает по нужным путям)
gulp.task('mi_pixels', gulp.series('mi_screens', 'mi_thumbs'));


// создание секвенсов в папке structure. В этой папке должны лежать root.mm и html, связанные по метатегам через CLMutilities
gulp.task('clm_json', gulp.series('pre_mm', 'mm_to_json', 'json_folders'));

gulp.task('isales_clm_json', gulp.series('pre_mm', 'mm_to_json', 'isales_json_folders'));

// линтер кода
gulp.task('lint', gulp.series('html-lint', 'json-lint', 'js-lint', 'css-lint', 'jscpd'));

// Открывает доступ по порту (шаблон StoryCLM) и вешает вотчер
gulp.task('sync', gulp.series('stock-watch'));

// Открывает доступ по порту (шаблон с sequence) и вешает вотчер
gulp.task('seq-sync', gulp.series('sequence-watch'));

// Оптимизация картинок. сохраняем оптимизированные картинки в папке temp
gulp.task('img_compress', gulp.series('image_classic', 'image_2'));

// билдует без скриншотов для StoryCLM
gulp.task('minbuild', gulp.series('image-build', 'html-build', 'svg-build', 'style-build', 'fonts-build', 'js-build', 'json-build', 'media-build', 'minbuild_notifier'));

// билдует со скриншотами для StoryCLM
gulp.task('build', gulp.series('minbuild', 'webshot', 'build_notifier'));

// билдует для Communicate
gulp.task('communicate:build', gulp.series('image-build', 'html-build', 'style-build', 'fonts-build', 'js-build', 'json-build', 'cm_files-build', 'communicate_build_notifier'));

// билдует для MI
gulp.task('mi:build', gulp.series('image-build', 'html-build', 'style-build', 'fonts-build', 'js-build', 'json-build', 'mi_files-build', 'mi_build_notifier'));

// билдует для Veeva
gulp.task('veeva:build', gulp.series('image-build', 'html-build', 'style-build', 'fonts-build', 'js-build', 'json-build', 'veeva_files-build', 'veeva_build_notifier'));

// билдует и зипует пакет для StoryCLM
gulp.task('build-zip', gulp.series('image-build', 'html-build', 'svg-build', 'style-build', 'fonts-build', 'js-build', 'json-build', 'media-build', 'webshot', 'auto-zip', 'build_notifier'));

// билдует и зипует пакет для MI
gulp.task('mi:build-zip', gulp.series('mi:build', 'auto-zip', 'mi_build_notifier'));

// билдует и зипует пакет для Veeva. TODO - сделать зипование самой папки temp, а не ее содержимое.
gulp.task('veeva:build-zip', gulp.series('veeva:build', 'auto-zip', 'veeva_build_notifier'));

// билдует и зипует пакет для Communicate
gulp.task('cm:build-zip', gulp.series('communicate:build', 'auto-zip', 'communicate_build_notifier'));
