'use strict';
module.exports = (gulp, plugins, files_path, src_folder, path) => {
    let output_folder = `/temp/${src_folder.split('/').pop()}`;
    return gulp.src((`${src_folder}${files_path.src.fonts}`))
        .pipe(gulp.dest(`${src_folder}${output_folder}${files_path.isales_build.fonts}`));

};
