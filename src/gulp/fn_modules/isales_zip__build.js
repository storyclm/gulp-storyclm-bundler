const fs = require('fs'),
    archiver = require('archiver'),
    rimraf = require('rimraf'),
    prettyBytes = require('pretty-bytes'),
    chalk = require('chalk');
module.exports = (gulp, plugins, files_path, src_folder, path) => {
    let src_path_arr = src_folder.split('/');
    let output = fs.createWriteStream(`${src_folder}/../../build_zips/${src_path_arr[src_path_arr.length - 2]}/${src_path_arr.pop()}.zip`);
    let archive = archiver('zip');

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);
    archive.bulk([
        {
            expand: true,
            cwd: `${src_folder}/temp/`,
            src: ['**'],
            dest: `./`
        }
    ]);
    archive.on('finish', () => {
        rimraf.sync(`${src_folder}/${files_path.clean}`);
        console.log(chalk.blue(`${src_folder.split('/').pop()} ${chalk.black('has been zipped with')} ${chalk.green(prettyBytes(archive.pointer()))}`));
    })
    archive.finalize();
};
