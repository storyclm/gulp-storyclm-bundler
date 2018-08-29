'use strict';
const gulpFn = require('gulp-fn'),
    fs = require('fs'),
    build__html = require('../fn_modules/build__html.js'),
    build__images = require('../fn_modules/build__images.js'),
    build__fonts = require('../fn_modules/build__fonts.js'),
    build__js = require('../fn_modules/build__js.js'),
    build__json = require('../fn_modules/build__json.js'),
    build__mi_files = require('../fn_modules/build__mi_files.js'),
    zip__build = require('../fn_modules/zip__build.js'),
    build__style = require('../fn_modules/build__style.js'),
    chalk = require('chalk');

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
                console.log(`${chalk.red(element)} is building`);
                build__html(gulp, plugins, file_path, seq_path, path);
                build__style(gulp, plugins, file_path, seq_path, path);
                build__images(gulp, plugins, file_path, seq_path, path);
                build__fonts(gulp, plugins, file_path, seq_path, path);
                build__js(gulp, plugins, file_path, seq_path, path);
                build__json(gulp, plugins, file_path, seq_path, path);
                build__mi_files(gulp, plugins, file_path, options, seq_path, path);
            });
        }));
    };
