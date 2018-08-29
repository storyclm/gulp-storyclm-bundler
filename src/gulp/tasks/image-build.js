'use strict';

module.exports = (gulp, plugins, file_path, options, path) => () => {
    gulp.src((options.project + file_path.src.img))
        .pipe(gulp.dest(options.project + file_path.build.img));
    return gulp.src((options.project + file_path.src.img2))
        .pipe(gulp.dest(options.project + file_path.build.img2));
};
