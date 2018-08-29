'use strict';
const gulpFn = require('gulp-fn'),
fs = require('fs'),
zip__build = require('../fn_modules/zip__build.js');
module.exports = (gulp, plugins, file_path, options, path) => () => {
    return gulp.src(options.project).pipe(gulpFn((file) => {
        function getDirectories(srcpath) {
            return fs.readdirSync(srcpath).filter((file) => {
                return fs.statSync(path.join(srcpath, file)).isDirectory();
            });
        }

        let dirs = getDirectories(`${options.project}/`);
        let build_zip__folder = `${options.project}/../build_zips`;
            if (!fs.existsSync(build_zip__folder)) {
                fs.mkdirSync(build_zip__folder);
            }
            dirs.forEach((element, index, array) => {
                let seq_path = `${options.project}/${element}`;
                zip__build(gulp, plugins, file_path, seq_path, path);
            });
        }));
    };
