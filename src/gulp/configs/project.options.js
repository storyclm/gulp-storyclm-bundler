module.exports = {
    project: getDefaultContext(),
    projectsSettings: {
        mi: {
            file_path: {
                src: {
                    pdf: '/export/export.pdf',
                    media: '/media/**/*.*',
                    parameters: '/parameters/parameters.xml'
                },
                build: {
                    pdf: '/temp/export/',
                    media: '/temp/media/',
                    parameters: '/temp/parameters/'
                }
            }
        },
        veeva: {
            file_path: {
                src: {
                    thumbs: '/*.png'
                },
                build: {
                    thumbs: '/'
                }
            }
        },
        communicate: {
            file_path: {
                src: {
                    previews: 'previews/**/*.*',
                    resources: 'resources/**/*.*',
                    previewImage: 'preview.png',
                    slidesFolder: 'slides/**/*.html'
                },
                build: {
                    previews: '/temp/previews/',
                    resources: '/temp/resources/',
                    previewImage: '/temp/',
                    slidesFolder: '/temp/slides/'
                }
            }
        },
        isales: {
            file_path: {
                src: {
                    previews: '/*.jpg'
                },
                build: {
                    previews: '/'
                }
            }
        },
        story: {}
    }
};
function getDefaultContext() {
    var argv = process.argv[2] || process.argv[3];
    if (typeof argv !== 'undefined' && argv.indexOf('--') < 0) {
        argv = process.argv[3];
    }

    return (typeof argv === 'undefined') ?
        console.log('Error! No arguments') :
        argv.replace('--', '../');
}
