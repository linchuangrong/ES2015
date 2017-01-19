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
				sourceMap: true,
				presets: ['babel-preset-es2015']
			},
			dist: {
				files: {
					'js_es5/test1.js': 'js_es6/test1.js'
				}
			}
		},
		//压缩es5
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			es5: {
				files: [{
					expand: true,
					cwd: 'js_es5', //js目录下
					src: '**/*.js', //所有js文件
					dest: 'js_es5_min', //输出到此目录下
					//ext: '.js'
				}]
			}
		},
		//css压缩
		cssmin: {
			options: {
				keepSpecialComments: 0
			},
			target: {
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
			//压缩css
			css: {
				files: ['css/*.css', '!css/*.min.css'],
				tasks: ['css'],
				options: {
					livereload: false
				}
			},
			//es6转es5
			es6: {
				files: ['js_es6/**/*.js'],
				tasks: ['es6'],
				options: {
					livereload: false
				}
			},
			//压缩es5
			es5: {
				files: ['js_es5/**/*.js'],
				tasks: ['es5'],
				options: {
					livereload: false
				}
			},
			
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['babel', 'uglify', 'cssmin']);
	grunt.registerTask('watcher', ['watch']);
	
	grunt.registerTask('css', ['cssmin']);
	grunt.registerTask('es6', ['babel']);
	grunt.registerTask('es5', ['uglify:es5']);
};