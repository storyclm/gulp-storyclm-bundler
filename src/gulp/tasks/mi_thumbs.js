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
            saveAsPdf(png_screens, counter, png_path);
            let sequences_json = JSON.parse(fs.readFileSync(json_path, 'utf8'));
            setTimeout(() => {
                for (let i = 0; i < sequences_json.sequences.length; i++) {
                    let sequence_name = sequences_json.sequences[i];
                    let sequence = `${options.project}/${sequences_json.sequences[i]}`;
                    transferMiThumbs(sequence, sequence_name, png_path);
                }
            }, (sequences_json.sequences.length*1000));

            // fs.readFile(json_path, 'utf8', (err, data) => {
            //     if (err) {
            //         return console.log(err);
            //     }
            //
            // })
            done();
        });
    }));
}
function saveAsPdf(thumbs, c, th_path) {
    if (c < thumbs.length) {
        let seq_orig_name = thumbs[c].slice(0, -4);
        let dest_path = `${th_path}/export_pdfs`;
        if (!fs.existsSync(dest_path)) {
            fs.mkdirSync(dest_path);
        }
        if (!fs.existsSync(`${dest_path}/${seq_orig_name}`)) {
            fs.mkdirSync(`${dest_path}/${seq_orig_name}`);
            fs.mkdirSync(`${dest_path}/${seq_orig_name}/export`);
        }
        let pdf_options = {
            layout: 'landscape',
            size: [
                768, 1024
            ],
            margin: 0
        };
        let document_pdf = new pdfkit(pdf_options);
        let pdfWriteStream = fs.createWriteStream(`${dest_path}/${seq_orig_name}/export/export.pdf`);
        document_pdf.pipe(pdfWriteStream);
        // document_pdf.pipe(fs.createWriteStream('./export.pdf'));
        document_pdf.image(`${th_path}/${thumbs[c]}`, 0, 0, {
            width: 1024,
            height: 768
        });
        document_pdf.end();
        pdfWriteStream.on('finish', () => {
            c++;
            saveAsPdf(thumbs, c, th_path);
        });
    }
}
function saveAsThumb(thumbs, t, th_path) {
    if (t < thumbs.length) {
        let seq_orig_name = thumbs[t].slice(0, -4);
        let dest_path = `${th_path}/media_thumbnails`;
        if (!fs.existsSync(dest_path)) {
            fs.mkdirSync(dest_path);
        }
        if (!fs.existsSync(`${dest_path}/${seq_orig_name}`)) {
            fs.mkdirSync(`${dest_path}/${seq_orig_name}`);
            fs.mkdirSync(`${dest_path}/${seq_orig_name}/media`);
            fs.mkdirSync(`${dest_path}/${seq_orig_name}/media/images`);
            fs.mkdirSync(`${dest_path}/${seq_orig_name}/media/images/thumbnails`);
        }
        sharp(`${th_path}/${thumbs[t]}`).resize(200, 150).toFile(`${dest_path}/${seq_orig_name}/media/images/thumbnails/200x150.jpg`, function(err) {
            if (err) {
                console.log(err);
            }
        });
        t++;
        saveAsThumb(thumbs, t, th_path);
    }
}
function transferMiThumbs(seq, seq_name, ths_path) {
    let export_pdf__path = `${ths_path}/export_pdfs`,
        thumbnails_path = `${ths_path}/media_thumbnails`;
    if (!fs.existsSync(`${seq}/media/images`)) {
        fs.mkdirSync(`${seq}/media/images`);
        fs.mkdirSync(`${seq}/media/images/thumbnails`);
    }
    if (!fs.existsSync(`${seq}/export`)) {
        fs.mkdirSync(`${seq}/export`);
    }
    console.log(seq_name);
    fs.copyFile(`${thumbnails_path}/${seq_name}/media/images/thumbnails/200x150.jpg`, `${seq}/media/images/thumbnails/200x150.jpg`, (err) => {
        if (err) {
            console.log(err);
        }
        fs.copyFileSync(`${export_pdf__path}/${seq_name}/export/export.pdf`, `${seq}/export/export.pdf`);
    });
}
