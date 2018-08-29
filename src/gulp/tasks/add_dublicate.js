'use strict';
const gulpFn = require('gulp-fn');
const fs = require('fs');
const pd = require('pretty-data').pd;

module.exports = (gulp, plugins, file_path, options, path) => (done) => {
  return gulp.src(options.project).pipe(gulpFn((file) => {
    // let json_map = `${options.project}${file_path.mm_json}`;
    let mm_map = `${options.project}/root.mm`;
    fs.readFile(mm_map, 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      }
      let temp = data;
      let search_template = /TEXT="[a-zA-Z0-9-_]*"/g;
      let result_arr = temp.match(search_template);
      result_arr.splice(0, 1);
      for (let i = 0; i < result_arr.length; i++) {
        let presuccess_string = result_arr[i].split('"')[1];
        let success_string = `"${presuccess_string}"`;
        let search_string = new RegExp(success_string, 'g');
        let counter = 0;
        temp = temp.replace(search_string, () => {
          let result_replace;
          if (counter != 0) {
            let orig_file = fs.readFileSync(`${options.project}/${presuccess_string}.html`);
            console.log(search_string);
            let su_string = `${presuccess_string}-${counter}`;
            result_replace = `"${su_string}"`;
            fs.writeFileSync(`${options.project}/${su_string}.html`, orig_file);
          } else {
            result_replace = success_string;
          }
          counter++;
          return result_replace;
        });
        if (i == result_arr.length - 1) {
          fs.writeFile(mm_map, temp, 'utf8', function(err) {
            if (err) {
              return console.log(err);
            }
            console.log(`root.mm updated (dublicates)!`);
          });
        }
      }
    })
  })).pipe(gulp.dest(options.project))
  done();
}
