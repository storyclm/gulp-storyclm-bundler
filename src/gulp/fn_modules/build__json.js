const prettifyjs = require('gulp-js-prettify');

module.exports = (gulp, plugins, files_path, src_folder, path) => {
    return gulp.src((`${src_folder}${files_path.src.json}`))
            .pipe(prettifyjs({collapseWhitespace: true}))
            .pipe(gulp.dest(`${src_folder}${files_path.build.json}`));
};
