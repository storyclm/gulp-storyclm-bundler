'use strict';
module.exports = (gulp, plugins, files_path, src_folder, path) => {
    return gulp.src((`${src_folder}${files_path.src.fonts}`))
            .pipe(gulp.dest(`${src_folder}${files_path.build.fonts}`));

};
