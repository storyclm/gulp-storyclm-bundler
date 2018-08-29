/**
 * создает список секвенсов в sequences.json
 */

'use strict';
const gulpFn = require('gulp-fn');
const fs = require('fs');

module.exports = (gulp, plugins, file_path, options, path) => (done) => {
  return gulp.src(options.project).pipe(gulpFn((file) => {

    let json_path = `${options.project}${file_path.mm_json}`;
    // fs.readFile(json_path, 'utf8', (err, data) => {
    //   if (err) {
    //     return console.log(err);
    //   }
      let data = fs.readFileSync(json_path,'utf8');
      let searching0 = new RegExp(/text/g);
      let searching1 = new RegExp(/children\: \[\{/g);
      let searching2 = new RegExp(/leaf\: true/g);
      let searching3 = new RegExp(/\}\, \{/g);
      let searching4 = new RegExp(/\}\]/g);

      let result0 = data.replace(searching0, `"text"`);
          result0 = result0.replace(searching1, `"children":[{`);
          result0 = result0.replace(searching2, `"leaf": true`);
          result0 = result0.replace(/\'/g, "\"");

      let result1 = data.replace(searching0, `"text"`);
          result1 = result1.replace(searching1, "");
          result1 = result1.replace(searching2, "");
          result1 = result1.replace(/\'/g, "\"");
          result1 = result1.replace(searching3, "");
          result1 = result1.replace(searching4, "");
          result1 = result1.replace(/^\s*[\r\n]/gm, "");
          result1 = result1.replace(/\n/gm, "");
          result1 = result1.replace(/,\}/, "]}");
          result1 = result1.replace(/\{/, `{"sequences": [`);
          result1 = result1.replace(/"text":/g, "");

      fs.writeFile(json_path, result0, 'utf8', function(err) {
        if (err) {
          return console.log(err);
        }
        console.log(`dev_map.json created!`);
      });

      fs.writeFile(`${options.project}${file_path.seq_json}`, result1, 'utf8', function(err) {
        if (err) {
          return console.log(err);
        }
        console.log(`sequences.json created!`);
      });
    // });
  }))
  done();
};
