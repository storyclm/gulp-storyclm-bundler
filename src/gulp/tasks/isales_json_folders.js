/**
 * переносит уже связанные по метатегам html из папки structure каждый в свою папку/секвенс. Секвенс/папки также создаются.
 */

'use strict';
const gulpFn = require('gulp-fn');
const fs = require('fs');
const pd = require('pretty-data').pd;

module.exports = (gulp, plugins, file_path, options, path) => (done) => {
    return gulp.src(options.project).pipe(gulpFn((file) => {
        let json_path = `${options.project}${file_path.seq_json}`;
        fs.readFile(json_path, 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            }
            let a_json = pd.json(data);
            let seq_json = JSON.parse(a_json);
            for (let i = 0; i < seq_json.sequences.length; i++) {
                if (!fs.existsSync(`${options.project}/${seq_json.sequences[i]}`)) {
                    fs.mkdirSync(`${options.project}/${seq_json.sequences[i]}`);
                    // console.log(seq_json.sequences[i]);
                }
                if (!fs.existsSync(`${options.project}/${seq_json.sequences[i]}/${seq_json.sequences[i]}.html`)) {
                    fs.copyFileSync(`${options.project}/${seq_json.sequences[i]}.html`,`${options.project}/${seq_json.sequences[i]}/${seq_json.sequences[i]}.html`);
                    fs.unlinkSync(`${options.project}/${seq_json.sequences[i]}.html`);
                }
            }
            fs.writeFile(json_path, a_json, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                }
                console.log("Sequences was created!");
            });
        })
    }))
    done();
};
