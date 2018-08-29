/**
 * Создание скриншотов
 */

'use strict';
const notify = require('gulp-notify'), // показывает уведомления в системных попапах
  webshot = require('gulp-webshot'); // делает скриншоты страниц
module.exports = (gulp, plugins, file_path, options, path) => (done) => {
  return gulp.src((options.project + file_path.src.html))
        .pipe(webshot({
            dest: options.project + '/temp/screenshots',
            root: options.project,
            windowSize: {
                width: 1024,
                height: 768
            },
            phantomPath: './node_modules/phantomjs/bin/phantomjs',
            streamType: 'png',
            renderDelay: 3000
        }));
        notify({
        title: notifyConfig.title,
        message: 'Screenshots done!'
    }).write('Screenshots done!');
        done();
};
