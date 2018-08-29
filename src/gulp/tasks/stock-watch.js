/**
 * Расшаривает по локали и по внешней ссылке (шаблон StoryCLM)
 */

'use strict';

const browserSync = require('browser-sync').create();
const ngrok = require('ngrok');
module.exports = (gulp, plugins, file_path, options, path) => (done) => {
  browserSync.init({
    notify: false,          // TODO: CORS не работает если забирает не с локальных файлов.
    logLevel: "debug",
    server: {
      baseDir: `./${options.project}`,
      directory: true,
      middleware: [function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "*");
        res.setHeader("Access-Control-Allow-Headers", "*");
        next();
      }]
    }
  }, function(err, bs) {
    // ngrok.connect(bs.options.get('port'), function(err, url) {
    //   console.log(' -------------------------------------');
    //   console.log(' Web link is:');
    //   console.log('  is: ' + bs.options.get('cors'));
    //   console.log("\x1b[35m", url);
    //   console.log("\x1b[0m", '-------------------------------------');
    // });
  });
  browserSync.watch(options.project + '/' + file_path.watch.style, browserSync.reload);
  browserSync.watch(options.project + '/' + file_path.watch.html, browserSync.reload);
  browserSync.watch(options.project + '/' + file_path.watch.js, browserSync.reload);
  done();
};
