
'use strict';
const gulpFn = require('gulp-fn');
const fs = require('fs');
const sharp = require('sharp');
module.exports = (gulp, plugins, file_path, options, path) => () => {
  return gulp.src(options.project)
        .pipe(gulpFn((file) => {
            function getDirectories(srcpath) {
                return fs.readdirSync(srcpath).filter((file) => {
                    return fs.statSync(path.join(srcpath, file)).isDirectory();
                });
            }

            let dirs = getDirectories(options.project + '/');
            let temp_dir = `${options.project}/../for_mm`;
            if (!fs.existsSync(temp_dir)) {
                fs.mkdirSync(temp_dir);
            }
            dirs.forEach((element, index, array) => {
                let tmp_dir = `${options.project}/${element}.zip`;
                if (!fs.existsSync(`${options.project}/../build_zips`)) {
                    fs.mkdirSync(`${options.project}/../build_zips`)
                }
                fs.unlinkSync(tmp_dir);

                // fs.rmdirSync(`${options.project}/${element}/temp`)
                // sharp(`${options.project}/${element}/temp/screenshots/${element}.png`).resize(960, 720).toFile(`${options.project}/${element}/${element}-thumb.png`, function(err) {
                //     if (err) {
                //         console.log(err);
                //     }
                // });
            });
        }));
};
