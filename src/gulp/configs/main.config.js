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
    isales_build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: '/',
        jsx: '/',
        js: '/js/',
        json: '/',
        css: '/css/',
        img: '/images/',
        img2: '/img/',
        fonts: '/fonts/',
        zip: '/',
        mm: '/',
        media: '/mediafiles/',
        same: '/*/**/'
    },
    veeva_build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: '/',
        jsx: '/',
        js: '/js/',
        json: '/',
        css: '/css/',
        img: '/images/',
        img2: '/img/',
        fonts: '/fonts/',
        zip: '/',
        mm: '/',
        media: '/mediafiles/',
        same: '/*/**/'
    },
    components: {
        html_source: 'temp/*.html',
        html_inner: '/temp/html/*.html',
        html: '/temp/html/',
        html_build: '/component_build/',
        html_build_src: '/component_build/*.html',
        html_outer: '/temp/html/result/',
        slide_component: '/component_build/slide_component/',
        html_release: '/component_build/release/'
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
        svg: '/*.svg',
        templates: '/temp/*.html'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: '*.html',
        js: 'js/**/*.js',
        style: 'css/**/*.css',
        img: 'images/**/*.*',
        img2: 'img/**/*.*',
        fonts: 'fonts/**/*.*'
    },
    clean: '/temp',
    trash: '/temp/html/result/',
    mm_json:'/dev_map.json',
    seq_json:'/sequences.json'
};
