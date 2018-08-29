'use strict';

module.exports = (gulp, plugins, file_path, options, path) => () => {
    return gulp.src((options.project + file_path.src.svg))
        .pipe(gulp.dest(options.project + file_path.build.svg));
};
