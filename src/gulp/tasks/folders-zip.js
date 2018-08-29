
'use strict';
const gulpFn = require('gulp-fn');
const fs = require('fs');
const archiver = require('archiver');
module.exports = (gulp, plugins, file_path, options, path) => () => {
  return gulp.src(options.project)
        .pipe(gulpFn((file) => {
            function getDirectories(srcpath) {
                return fs.readdirSync(srcpath).filter((file) => {
                    return fs.statSync(path.join(srcpath, file)).isDirectory();
                });
            }

            let dirs = getDirectories(options.project + '/');
            let index = dirs.indexOf('node_modules');

            dirs.forEach((element, index, array) => {
                let output = fs.createWriteStream(options.project + '/' + element + '.zip');
                let archive = archiver('zip');
                output.on('close', () => {
                    console.log(archive.pointer() + ' total bytes');
                    console.log('archiver has been finalized and the output file descriptor has closed.');
                });

                archive.on('error', (err) => {
                    throw err;
                });

                archive.pipe(output);

                archive.bulk([
                    {expand: true, cwd: options.project + '/' + element, src: ['**'], dest: element}
                ]);
                archive.finalize();
            });
        }));
};
