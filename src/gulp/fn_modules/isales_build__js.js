const prettifyjs = require('gulp-js-prettify');

module.exports = (gulp, plugins, files_path, src_folder, path) => {
    let output_folder = `/temp/${src_folder.split('/').pop()}`;
    return gulp.src((`${src_folder}${files_path.src.js}`))
        .pipe(prettifyjs({collapseWhitespace: true}))
        .pipe(gulp.dest(`${src_folder}${output_folder}${files_path.isales_build.js}`));
};
