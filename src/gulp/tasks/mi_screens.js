/**
 * Создание скриншотов
 */

'use strict';
const notify = require('gulp-notify'), // показывает уведомления в системных попапах
    gulpFn = require('gulp-fn'),
    fs = require('fs'),
    webshot = require('gulp-webshot'); // делает скриншоты страниц
module.exports = (gulp, plugins, file_path, options, path) => () => {
    return gulp.src(
        (`${options.project}/../common${file_path.src.html}`)).pipe(webshot({
        dest: `${options.project}/../common/temp/screenshots`,
        root: `${options.project}/../common`,
        windowSize: {
            width: 1024,
            height: 768
        },
        phantomPath: './node_modules/phantomjs/bin/phantomjs',
        streamType: 'png',
        renderDelay: 3000
    }));
    notify({title: notifyConfig.title, message: 'Screenshots done!'}).write('Screenshots done!');
    console.log('done!')
};
