const gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    file_path = require('../configs/main.config'),
    options = require('../configs/project.options'),
    register = require(`../utils/register`),
    path = require('path');
module.exports = (gulp, plugins, files_path, options, src_folder, path) => {
    let output_folder = `/temp/${src_folder.split('/').pop()}`;
    return gulp.src((`${src_folder}${options.projectsSettings.veeva.file_path.src.thumbs}`))
        .pipe(gulp.dest(`${src_folder}${output_folder}${options.projectsSettings.veeva.file_path.build.thumbs}`));
};
