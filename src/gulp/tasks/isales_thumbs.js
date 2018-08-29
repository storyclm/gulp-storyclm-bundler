'use strict';
const gulpFn = require('gulp-fn');
const fs = require('fs');
const pdfkit = require('pdfkit');
const sharp = require('sharp');

module.exports = (gulp, plugins, file_path, options, path) => (done) => {
    return gulp.src(options.project).pipe(gulpFn((file) => {
        let png_path = `${options.project}/../common/temp/screenshots`
        fs.readdir(png_path, (err, data) => {
            if (err) {
                console.log(err);
            }
            let png_screens = data.filter(screen => screen.indexOf('.png') !== -1);
            let counter = 0;
            let json_path = `${options.project}${file_path.seq_json}`;
            saveAsThumb(png_screens, counter, png_path);
            setTimeout(() => {
                let sequences_json = JSON.parse(fs.readFileSync(json_path, 'utf8'));
                for (let i = 0; i < sequences_json.sequences.length; i++) {
                    let sequence_name = sequences_json.sequences[i];
                    let sequence = `${options.project}/${sequences_json.sequences[i]}`;
                    transferMiThumbs(sequence, sequence_name, png_path);
                }
            }, 3000);

            done();
        });
    }));
}
function saveAsThumb(thumbs, t, th_path) {
    if (t < thumbs.length) {
        let seq_orig_name = thumbs[t].slice(0, -4);
        let dest_path = `${th_path}/thumbnails`;
        if (!fs.existsSync(dest_path)) {
            fs.mkdirSync(dest_path);
        }
        if (!fs.existsSync(`${dest_path}/${seq_orig_name}`)) {
            fs.mkdirSync(`${dest_path}/${seq_orig_name}`);
            fs.mkdirSync(`${dest_path}/${seq_orig_name}/thumbnails`);
        }
        sharp(`${th_path}/${thumbs[t]}`).resize(200, 150).toFile(`${dest_path}/${seq_orig_name}/${seq_orig_name}.jpg`, function(err) {
            if (err) {
                console.log(err);
            }
        });
        t++;
        saveAsThumb(thumbs, t, th_path);
    }
}
function transferMiThumbs(seq, seq_name, ths_path) {
    let thumbnails_path = `${ths_path}/thumbnails`;
    let sequence_thumb_name = seq_name;
    if (seq_name.split('-').length == 2) {
      sequence_thumb_name = seq_name.split('-')[0];
    }
    fs.copyFile(`${thumbnails_path}/${sequence_thumb_name}/${sequence_thumb_name}.jpg`, `${seq}/${seq_name}.jpg`, (err) => {
        if (err) {
            console.log(err);
        }
    });
}
