'use strict';
const rigger = require('gulp-rigger'),
    rev = require('gulp-rev-mtime');
module.exports = (gulp, plugins, files_path, src_folder, path) => {
    let output_folder = `/temp/${src_folder.split('/').pop()}`;
    return gulp.src((`${src_folder}${files_path.src.html}`))
        .pipe(rev({
            'cwd': src_folder + '/'
        }))
        .pipe(gulp.dest(`${src_folder}${output_folder}${files_path.isales_build.html}`));
};
