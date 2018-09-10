module.exports = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: '/temp/',
        svg: '/temp/',
        jsx: '/temp/',
        js: '/temp/js/',
        json: '/temp/',
        css: '/temp/css/',
        img: '/temp/images/',
        img2: '/temp/img/',
        fonts: '/temp/fonts/',
        zip: '/',
        mm: '/temp/',
        media: '/temp/mediafiles/',
        same: '/*/**/'
    },
    src: { //Пути откуда брать исходники
        html: '/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: '/js/**/*.js', //В стилях и скриптах нам понадобятся только main-page файлы
        json: '/**/*.json',
        style: '/css/**/*.css',
        img: '/images/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        img2: '/img/**/*.*',
        fonts: '/fonts/**/*.*',
        zip: '/temp/**/*.*',
        mm: '/*.mm',
        media: '/mediafiles/**/*.*',
        svg: '/*.svg'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: '*.html',
        js: 'js/**/*.js',
        style: 'css/**/*.css',
        img: 'images/**/*.*',
        img2: 'img/**/*.*',
        fonts: 'fonts/**/*.*'
    },
    clean: '/temp'
};
