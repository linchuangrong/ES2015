/**
 * Created by Administrator on 2016/12/30.
 */


module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: false,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: {
                    'js_es5/test1.js': 'js_es6/test1.js'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'js_es5',//js目录下
                    src: '**/*.js',//所有js文件
                    dest: 'js_es5_min',//输出到此目录下
                    ext: '.min.js'
                }]
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            compress: {
                files: {
                    'css/style.min.css': ["css/style.css"]
                }
            }
        },
        watch: {
            js: {
                files: ['js_es5/*.js', 'css/style.css','js_es6/test1.js'],
                tasks: ['default'],
                options: {livereload: false}
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['babel', 'uglify', 'cssmin']);
    grunt.registerTask('watcher', ['watch']);
};
