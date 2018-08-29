'use strict';

module.exports = (gulp, plugins, file_path, options, path) => (tasks) => {
  tasks.forEach((task) => {
    gulp.task(task, require(`../tasks/${task}`)(gulp, plugins, file_path, options, path));
  });
};
