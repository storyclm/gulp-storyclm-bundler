const prefixer = require('gulp-autoprefixer'),
    cssbeautify = require('gulp-cssbeautify'),
    makeUrlVer = require('gulp-make-css-url-version');
module.exports = (gulp, plugins, files_path, src_folder, path) => {
    let output_folder = `/temp/${src_folder.split('/').pop()}`;
    return gulp.src((`${src_folder}${files_path.src.style}`))
        .pipe(makeUrlVer({
            useDate: true,
            format: 'MdhmsS'
        }))
        .pipe(prefixer({
            browsers: ['iOS 6.1']
        }))
        .pipe(cssbeautify())
        .pipe(gulp.dest(`${src_folder}${output_folder}${files_path.isales_build.css}`));
};
