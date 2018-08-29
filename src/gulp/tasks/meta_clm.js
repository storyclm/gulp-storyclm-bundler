'use strict';
const gulpFn = require('gulp-fn');
const fs = require('fs');
const pd = require('pretty-data').pd;
const traverse = require('traverse');

module.exports = (gulp, plugins, file_path, options, path) => (done) => {
  return gulp.src(options.project).pipe(gulpFn((file) => {
    let json_path = `${options.project}/dev_map.json`;
    fs.readFile(json_path, 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      }
      let temp = data;
      let search_template = /"text": "[a-zA-Z0-9-_]*"/g;
      let result_arr = temp.match(search_template);
      let slides_count = result_arr.length;
      let map_json = JSON.parse(temp);
      let first_slide = Object.keys(map_json)[0];

traverse(map_json).forEach((x) => {

    console.log(`${x}`);
})

      // meta_obj(map_json[0], [], 0);
      // for (let i = 0; i< slides_count; i++) {
      // }
    });
  })).pipe(gulp.dest(options.project))
  done();
}
function meta_obj(obj, visited_arr, iterations) {
  console.log(iterations);
  let key0 = Object.keys(obj)[0];
  let key1 = Object.keys(obj)[1];
  let new_obj;
  // console.log(visited_arr.length);
  // console.log(obj[1])
  let previous_obj = visited_arr[visited_arr.length - 1];
  if (key1 == "children") {
    // let previous_obj = visited_arr[visited_arr.length - 1];
    visited_arr.push(obj);
    new_obj = obj[key1];
    let next_prev = '';
    // console.log(new_obj[0]);
    if (new_obj.length) {
      for (let i = 0; i < new_obj.length; i++) {
        next_prev = `${next_prev}, ${new_obj[i][key0]}`;
      }
    }
    if (previous_obj) {
      next_prev = `previous = ${previous_obj[0][key0]};  next = ${next_prev}`;
    } else {
      next_prev = `next = ${next_prev}`;
    }
    console.log(`${obj[key0]}:${next_prev}`)
    for (let x = 0; x < new_obj.length; x++) {
      meta_obj(new_obj[iterations], visited_arr, x);
    }
  } else {
    new_obj = previous_obj;
    meta_obj(new_obj[iterations], visited_arr, iterations);
  }
}

//   let key0 = Object.keys(obj)[0];
//   let key1 = Object.keys(obj)[1];
//
// if (key1 = "children" && obj[key1].length == 1) {
//
// } else if (key1 = "children" && obj[key1].length > 1) {
//
// }

// console.log(obj.length);
// if (obj.length > 1) {
//
// } else {
//   let key0 = Object.keys(obj)[0];
//   let key1 = Object.keys(obj)[1];
//    console.log(`${key1}--${iterations}`);
//   if (key1 == "children" && iterations == 0) {
//     let replaced_obj = obj[key1];
//     let slide_to_record = opened_slide;
//     iterations++;
//     meta_obj(replaced_obj, replaced_obj.length, iterations, slide_to_record);
//   } else if (key1 == "children" && iterations > 0) {
//     console.log(typeof obj[key1]);
//   }
// }
let t_arr = [];
