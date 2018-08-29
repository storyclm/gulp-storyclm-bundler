/**
 * Расшаривает по локали и по внешней ссылке (шаблон StoryCLM)
 */

'use strict';
const fs = require('fs');
const browserSync = require('browser-sync').create();
const ngrok = require('ngrok');
module.exports = (gulp, plugins, file_path, options, path) => (done) => {
    browserSync.init({
        notify: false,
        cors: true,
        logLevel: "info",
        server: {
            baseDir: `./${options.project}`,
            directory: true
        }
    }, function (err, bs) {
        console.log(bs.active);
        ngrok.connect(bs.options.get('port'), function (err, url) {
            console.log(' -------------------------------------');
            console.log(' Web link is:');
            console.log("\x1b[35m", url);
            console.log("\x1b[0m", '-------------------------------------');
        });
    });
    browserSync.watch(options.project + '/**/' + file_path.watch.style,browserSync.reload);
    browserSync.watch(options.project + '/**/' + file_path.watch.html,browserSync.reload);
    browserSync.watch(options.project + '/**/' + file_path.watch.js,browserSync.reload);
    done();
};
