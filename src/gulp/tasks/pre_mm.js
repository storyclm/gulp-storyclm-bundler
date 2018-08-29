/**
 * конвертит карту из mm в json
 */

'use strict';
const xslt = require('gulp-xslt');
const rename = require('gulp-rename');
module.exports = (gulp, plugins, file_path, options, path) => (done) => {
  return gulp.src(`${options.project}/root.mm`).pipe(xslt('FreeMind2TreeStoreJSON.xsl', {
    someVariable: '"value"',
    orAnotherVariable: '/with/xpath[@value]'
  })).pipe(rename((path) => {
    path.basename = "dev_map";
    path.extname = ".json";
  })).pipe(gulp.dest(options.project));
    done();
  // .pipe(gulp.dest(path.join(options.project, file_path.build.json + '/finded/')));
};
