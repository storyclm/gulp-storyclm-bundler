'use strict';
const gulpFn = require('gulp-fn'),
    fs = require('fs'),
    isales_build__html = require('../fn_modules/isales_build__html.js'),
    isales_build__images = require('../fn_modules/isales_build__images.js'),
    isales_build__fonts = require('../fn_modules/isales_build__fonts.js'),
    isales_build__js = require('../fn_modules/isales_build__js.js'),
    isales_build__json = require('../fn_modules/isales_build__json.js'),
    isales_build__style = require('../fn_modules/isales_build__style.js'),
    build__veeva_files = require('../fn_modules/build__veeva_files.js'),
    chalk = require('chalk');

module.exports = (gulp, plugins, file_path, options, path) => () => {
    return gulp.src(options.project).pipe(gulpFn((file) => {
        function getDirectories(srcpath) {
            return fs.readdirSync(srcpath).filter((file) => {
                return fs.statSync(path.join(srcpath, file)).isDirectory();
            });
        }

        let dirs = getDirectories(`${options.project}/`);
        dirs.forEach((element, index, array) => {
            let seq_path = `${options.project}/${element}`;
            console.log(`${chalk.red(element)} is building`);
            isales_build__html(gulp, plugins, file_path, seq_path, path);
            isales_build__style(gulp, plugins, file_path, seq_path, path);
            isales_build__images(gulp, plugins, file_path, seq_path, path);
            isales_build__fonts(gulp, plugins, file_path, seq_path, path);
            isales_build__js(gulp, plugins, file_path, seq_path, path);
            isales_build__json(gulp, plugins, file_path, seq_path, path);
            build__veeva_files(gulp, plugins, file_path, options, seq_path, path);
        });
    }));
};
