/**
 * прописывает в каждый секвенс parameters.xml (Важно! Calldialog не пишет. это надо руками дописывать), инлайновый скрипт в html,
 * пишет в body локеры системных свайпов
 */

'use strict';
const gulpFn = require('gulp-fn'),
    fs = require('fs'),
    chalk = require('chalk'),
    pd = require('pretty-data').pd;

module.exports = (gulp, plugins, file_path, options, path) => () => {
  return gulp.src(options.project).pipe(gulpFn((file) => {
    function getDirectories(srcpath) {
      return fs.readdirSync(srcpath).filter((file) => {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
      });
    };
    let html_files;
    fs.readdir(options.project, (err,files) => {
      let html_files = files.filter(filter_html);
    })
    let dirs = getDirectories(options.project + '/');
    dirs.forEach((element, index, array) => {
      let params_dir = `${options.project}/${element}/parameters`,
        params = `<?xml version="1.0" encoding="utf-8"?><Sequence Id="${element}" xmlns="urn:param-schema" NumberOfSlides="1"><Pages><Page pageid="${element}-PAGE-index" /></Pages></Sequence>`,
        params_xml = pd.xml(params),
        index_file = `${options.project}/${element}/index.html`;
      if (!fs.existsSync(params_dir)) {
        fs.mkdirSync(params_dir);
      }
      fs.writeFile(`${params_dir}/parameters.xml`, params_xml, (err) => {
        if (err) {
          return console.log(err);
        }
        console.log(`${chalk.red('parameters.xml')} in the ${chalk.green(element)} sequence was created`)
      });
      fs.readFile(index_file, 'utf8', (err, data) => {
        if (err) {
          return console.log(err);
        }
        let searching = new RegExp(/\<script\>window.parent.onEnterPage\('[a-zA-Z0-9-_]*PAGE-[a-zA-Z0-9-_]*'\)\<\/script\>/g);
        let result0 = data.replace(searching, '');
        let result00 = result0.replace('<body>','<body data-prevent-left-swipe="true" data-prevent-right-swipe="true">')
        let result = result00.replace('</body>',`<script>window.parent.onEnterPage('${element}-PAGE-index')</script></body>`);
        fs.writeFile(index_file, result, 'utf8', function(err) {
          if (err) {
            return console.log(err);
          }
          console.log(`${chalk.red('index.html')} in the ${chalk.green(element)} sequence was updated. ${chalk.red('Body data-prevent swipes added')}`);
        });
      });
    });
  }));
};
function filter_html(val) {
  if (val.indexOf('.mm') > -1) {
    return val;
  }
}
