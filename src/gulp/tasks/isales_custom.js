'use strict';
const gulpFn = require('gulp-fn');
const fs = require('fs');
const sharp = require('sharp');
module.exports = (gulp, plugins, file_path, options, path) => () => {
  return gulp.src(options.project).pipe(gulpFn((file) => {
    function getDirectories(srcpath) {
      return fs.readdirSync(srcpath).filter((file) => {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
      });
    }

    let dirs = getDirectories(options.project + '/');
    let temp_dir = `${options.project}/../`;

    dirs.forEach((element, index, array) => {
      search_src_links(element, options.project);

    });
  }));
};
function copy_htmls(sequence, proj_folder) {
  let sequence_html = `${proj_folder}/${sequence}/${sequence}.html`;
  let common_folder = `${proj_folder}/../common/${sequence}.html`;
  if (sequence.split('-').length == 1) {
    fs.copyFileSync(sequence_html, common_folder);
  }
}
function search_src_links(sequence,proj_folder) {
  let slide = fs.readFileSync(`${proj_folder}/${sequence}/${sequence}.html`, 'utf8'),
    new_common = `${proj_folder}/../common`,
    sequence_folder = `${proj_folder}/${sequence}`,
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
  if (!fs.existsSync(`${new_common}/css`)) {
    fs.mkdirSync(`${new_common}/css`);
  }
  if (!fs.existsSync(`${new_common}/js`)) {
    fs.mkdirSync(`${new_common}/js`);
  }
  if (!fs.existsSync(`${new_common}/mediafiles`) && fs.existsSync(`${sequence_folder}/mediafiles`)) {
    fs.mkdirSync(`${new_common}/mediafiles`);
  }
  for (let c = 0; c < css_src__arr.length; c++) {
    fs.copyFileSync(`${sequence_folder}/${css_src__arr[c]}`, `${new_common}/${css_src__arr[c]}`);
    let css_file = fs.readFileSync(`${new_common}/${css_src__arr[c]}`, 'utf8');
    incss_links(css_file, sequence, proj_folder);
  }
  for (let c = 0; c < js_src__arr.length; c++) {
    fs.copyFileSync(`${sequence_folder}/${js_src__arr[c]}`, `${new_common}/${js_src__arr[c]}`);
  }
  if (arr__src_mp3 != null) {
    for (let m = 0; m < arr__src_mp3.length; m++) {
      fs.copyFileSync(`${sequence_folder}/mediafiles${arr__src_mp3[m]}`, `${new_common}/mediafiles${arr__src_mp3[m]}`);
    }
  }
  if (arr__src_mp4 != null) {
    for (let m = 0; m < arr__src_mp4.length; m++) {
      fs.copyFileSync(`${sequence_folder}/mediafiles${arr__src_mp4[m]}`, `${new_common}/mediafiles${arr__src_mp4[m]}`);
    }
  }
  if (arr__src_pdf != null) {
    for (let m = 0; m < arr__src_pdf.length; m++) {
      let pdf_file = arr__src_pdf[m].substr(1);
      fs.copyFileSync(`${sequence_folder}/mediafiles/${pdf_file}`, `${new_common}/mediafiles/${pdf_file}`);
    }
  }
}
function incss_links(stylefile, seq, project_f) {
  let common_folder = `${project_f}/../common`,
  sequence_folder = `${project_f}/${seq}`;
  let fonts = /fonts\/[a-zA-Z0-9-_.]*.(ttf|otf)/g;
  let fonts__arr = stylefile.match(fonts);
  let bg_image = /(images|img)\/[a-zA-Z0-9-_\/]*.(png|jpg)/g;
  let bg_image__arr = stylefile.match(bg_image);

  if (!fs.existsSync(`${common_folder}/fonts`)) {
    fs.mkdirSync(`${common_folder}/fonts`);
  }
  if (fonts__arr != null) {
    for (let f = 0; f < fonts__arr.length; f++) {
      fs.copyFileSync(`${sequence_folder}/${fonts__arr[f]}`, `${common_folder}/${fonts__arr[f]}`);
    }
  }
  if (!fs.existsSync(`${common_folder}/images`)) {
    fs.mkdirSync(`${common_folder}/images`);
  }
  if (!fs.existsSync(`${common_folder}/img`) && fs.existsSync(`${sequence_folder}/img`)) {
    fs.mkdirSync(`${common_folder}/img`);
  }
  if (bg_image__arr != null) {
    for (let b = 0; b < bg_image__arr.length; b++) {
      if (fs.existsSync(`${sequence_folder}/${bg_image__arr[b]}`)) {
        let image_folder = bg_image__arr[b].split('/');
        if (image_folder.length == 3 && !fs.existsSync(`${common_folder}/${image_folder[0]}/${image_folder[1]}`)) {
          fs.mkdirSync(`${common_folder}/${image_folder[0]}/${image_folder[1]}`);
        }
        fs.copyFileSync(`${sequence_folder}/${bg_image__arr[b]}`, `${common_folder}/${bg_image__arr[b]}`);
      }
    }
  }
}
