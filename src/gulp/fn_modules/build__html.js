'use strict';
const rigger = require('gulp-rigger'),
    rev = require('gulp-rev-mtime');
module.exports = (gulp, plugins, files_path, src_folder, path) => {
    return gulp.src((`${src_folder}${files_path.src.html}`))
          .pipe(rev({
              'cwd': src_folder + '/'
          }))
          .pipe(gulp.dest((`${src_folder}${files_path.build.html}`)));
};
