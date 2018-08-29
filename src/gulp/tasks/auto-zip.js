/**
 * Создание zip
 * TODO: билдовать прямо в папку проекта
 */

'use strict';

const fs = require('fs'),
    archiver = require('archiver'),
    rimraf = require('rimraf'),
    notify = require('gulp-notify'),
    prettyBytes = require('pretty-bytes');
module.exports = (gulp, plugins, file_path, options, path) => (done) => {

    let output = fs.createWriteStream(`${options.project}/${options.project.split('/').pop()}_build.zip`);
    let archive = archiver('zip');

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);
    archive.bulk([
        {
            expand: true,
            cwd: `${options.project}/temp/`,
            src: ['**/*.*'],
            dest: `./`
        }
    ]);
    archive.on('finish', () => {
        rimraf.sync(`${options.project}/${file_path.clean}`);
        gulp.src(options.project).pipe(notify({
            onLast: true,
            message: () => {
                return `Success! The ${options.project.split('/').pop()}.zip's size is ${prettyBytes(archive.pointer())}`
            }
        }));
    });
    archive.finalize();
    done();
};
