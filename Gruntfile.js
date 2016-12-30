/**
 * Created by Administrator on 2016/12/30.
 */

module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//es6转es5
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
		//js压缩
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			js1: {
				files: [{
					expand: true,
					cwd: 'js_es5', //js目录下
					src: '*.js', //所有js文件
					dest: 'js_es5_min', //输出到此目录下
					ext: '.min.js'
				}]
			},
			//TODO 只压缩test2.js
			js2: {
				files: [{
					expand: true,
					cwd: 'js_es5', //js目录下
					src: 'test2.js', //所有js文件
					dest: 'js_es5_min', //输出到此目录下
					ext: '.min.js'
				}]
			}
		},
		//css压缩
		cssmin: {
			options: {
				keepSpecialComments: 0
			},
			target: {
				/*files: {
				    'css/style.min.css': ["css/style.css"]
				}*/
				files: [{
					expand: true,
					cwd: 'css', //js目录下
					src: ['*.css', '!*.min.css'], //所有css文件
					dest: 'css', //输出到此目录下
					ext: '.min.css'
				}]
			}
		},
		watch: {
			//监听所有文件
			js: {
				files: ['js_es5/test1.js', 'css/*.css', '!css/*.min.css', 'js_es6/test1.js'],
				tasks: ['default'],
				options: {
					livereload: false
				}
			},
			//TODO 只监听test2.js
			js2: {
				files: ['js_es5/test2.js'],
				tasks: ['js2'], //TODO 触发js2这个task
				options: {
					livereload: false
				}
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['babel', 'uglify:js1', 'cssmin']);
	grunt.registerTask('js2', ['uglify:js2']); //TODO 这是一个task,等会watch监测到test2.js发生变化时，会触发，执行uglify:js2
	grunt.registerTask('watcher', ['watch']);
};