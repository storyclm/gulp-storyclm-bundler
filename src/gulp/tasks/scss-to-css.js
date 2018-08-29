'use strict';
const sass = require('gulp-sass'),
prefixer = require('gulp-autoprefixer');
module.exports = (gulp, plugins, file_path, options, path) => () => {
  gulp.src((options.project + 'scss/*.*'))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(prefixer({
            browsers: ['iOS 8.4']   // TODO: разобраться как добавлять -webkit- к keyframes
        }))
        .pipe(gulp.dest(options.project + '/css'));
};
