'use strict';
module.exports = (gulp, plugins, files_path, src_folder, path) => {
    gulp.src((`${src_folder}${files_path.src.img}`))
        .pipe(gulp.dest(`${src_folder}${files_path.build.img}`));
    return gulp.src((`${src_folder}${files_path.src.img2}`))
            .pipe(gulp.dest(`${src_folder}${files_path.build.img2}`));
};
