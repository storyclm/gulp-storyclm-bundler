/**
 * Копирует необходимые source файлы (css, js, картинки, шрифты и медиа) для секвенсов
 * @// TODO: сделать перенос картинок описанных в <img src/>
 */

'use strict';
const gulpFn = require('gulp-fn');
const fs = require('fs');

module.exports = (gulp, plugins, file_path, options, path) => (done) => {
    return gulp.src(options.project).pipe(gulpFn((file) => {
        let json_path = `${options.project}${file_path.seq_json}`;
        fs.readFile(json_path, 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            }
            let seq_json = JSON.parse(data);
            for (let i = 0; i < seq_json.sequences.length; i++) {
                let opened_sequence = `${options.project}/${seq_json.sequences[i]}`;
                search_src_links(opened_sequence);
            }
        })
    }))
    done();
};
function search_src_links(sequence) {
    let slide = fs.readFileSync(`${sequence}/index.html`, 'utf8'),
        common_folder = `${sequence}/../../common`,
        test_dir = fs.readdirSync(common_folder, 'utf8'),
        search_css_src = /css\/[a-zA-Z0-9-_]*.css/g,
        search_js_src = /js\/[a-zA-Z0-9-_.]*.js/g,
        search_src_mp3 = /\/[a-zA-Z0-9-_.]*.mp3/g,
        search_src_mp4 = /\/[a-zA-Z0-9-_.]*.mp4/g,
        search_src_pdf = /\"[a-zA-Z0-9-_.]*.pdf/g,
        arr__src_mp3 = slide.match(search_src_mp3),
        arr__src_mp4 = slide.match(search_src_mp4),
        arr__src_pdf = slide.match(search_src_pdf),
        css_src__arr = slide.match(search_css_src),
        js_src__arr = slide.match(search_js_src);
    if (!fs.existsSync(`${sequence}/css`)) {
        fs.mkdirSync(`${sequence}/css`);
    }
    if (!fs.existsSync(`${sequence}/js`)) {
        fs.mkdirSync(`${sequence}/js`);
    }
    if (!fs.existsSync(`${sequence}/media`)) {
        fs.mkdirSync(`${sequence}/media`);
    }
    if (!fs.existsSync(`${sequence}/export`)) {
        fs.mkdirSync(`${sequence}/export`);
    }
    for (let c = 0; c < css_src__arr.length; c++) {
        fs.copyFileSync(`${common_folder}/${css_src__arr[c]}`, `${sequence}/${css_src__arr[c]}`);
        let css_file = fs.readFileSync(`${sequence}/${css_src__arr[c]}`, 'utf8');
        incss_links(css_file, sequence);
    }
    for (let c = 0; c < js_src__arr.length; c++) {
        fs.copyFileSync(`${common_folder}/${js_src__arr[c]}`, `${sequence}/${js_src__arr[c]}`);
    }
    if (arr__src_mp3 != null) {
        for (let m = 0; m < arr__src_mp3.length; m++) {
            fs.copyFileSync(`${common_folder}/media/${arr__src_mp3[m]}`, `${sequence}/media/${arr__src_mp3[m]}`);
        }
    }
    if (arr__src_mp4 != null) {
        for (let m = 0; m < arr__src_mp4.length; m++) {
            fs.copyFileSync(`${common_folder}/media/${arr__src_mp4[m]}`, `${sequence}/media/${arr__src_mp4[m]}`);
        }
    }
    if (arr__src_pdf != null) {
        for (let m = 0; m < arr__src_pdf.length; m++) {
            let pdf_file = arr__src_pdf[m].substr(1);
            fs.copyFileSync(`${common_folder}/media/${pdf_file}`, `${sequence}/media/${pdf_file}`);
        }
    }
}
function incss_links(stylefile, seq) {
    let common_folder = `${seq}/../../common`;
    let fonts = /fonts\/[a-zA-Z0-9-_.]*.(ttf|otf)/g;
    let fonts__arr = stylefile.match(fonts);
    let bg_image = /(images|img)\/[a-zA-Z0-9-_\/]*.(png|jpg)/g;
    let bg_image__arr = stylefile.match(bg_image);

    if (!fs.existsSync(`${seq}/fonts`)) {
        fs.mkdirSync(`${seq}/fonts`);
    }
    if (fonts__arr != null) {
        for (let f = 0; f < fonts__arr.length; f++) {
            fs.copyFileSync(`${common_folder}/${fonts__arr[f]}`, `${seq}/${fonts__arr[f]}`);
        }
    }
    if (!fs.existsSync(`${seq}/images`)) {
        fs.mkdirSync(`${seq}/images`);
    }
    if (!fs.existsSync(`${seq}/img`) && fs.existsSync(`${common_folder}/img`)) {
        fs.mkdirSync(`${seq}/img`);
    }
    if (bg_image__arr != null) {
        for (let b = 0; b < bg_image__arr.length; b++) {
            if (fs.existsSync(`${common_folder}/${bg_image__arr[b]}`)) {
                let image_folder = bg_image__arr[b].split('/');
                if (image_folder.length == 3 && !fs.existsSync(`${seq}/${image_folder[0]}/${image_folder[1]}`)) {
                    fs.mkdirSync(`${seq}/${image_folder[0]}/${image_folder[1]}`);
                }
                fs.copyFileSync(`${common_folder}/${bg_image__arr[b]}`, `${seq}/${bg_image__arr[b]}`);
            }
        }
    }
}
