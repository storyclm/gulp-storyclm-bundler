const gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    file_path = require('../configs/main.config'),
    options = require('../configs/project.options'),
    register = require(`../utils/register`),
    path = require('path');
module.exports = (gulp, plugins, files_path, options, src_folder, path) => {
    let output_folder = `/temp/${src_folder.split('/').pop()}`;
    return gulp.src((`${src_folder}${options.projectsSettings.isales.file_path.src.previews}`))
        .pipe(gulp.dest(`${src_folder}${output_folder}${options.projectsSettings.isales.file_path.build.previews}`));
};
