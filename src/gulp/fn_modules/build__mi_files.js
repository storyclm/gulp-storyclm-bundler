const gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  file_path = require('../configs/main.config'),
  options = require('../configs/project.options'),
  register = require(`../utils/register`),
  path = require('path');
module.exports = (gulp, plugins, files_path, options, src_folder, path) => {
    gulp.src((`${src_folder}${options.projectsSettings.mi.file_path.src.pdf}`))
          .pipe(gulp.dest(`${src_folder}${options.projectsSettings.mi.file_path.build.pdf}`));
      gulp.src((`${src_folder}${options.projectsSettings.mi.file_path.src.media}`))
          .pipe(gulp.dest(`${src_folder}${options.projectsSettings.mi.file_path.build.media}`));
      return gulp.src((`${src_folder}${options.projectsSettings.mi.file_path.src.parameters}`))
          .pipe(gulp.dest(`${src_folder}${options.projectsSettings.mi.file_path.build.parameters}`));
};
