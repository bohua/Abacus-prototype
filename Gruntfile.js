module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	var projectConfig = {
		distDir: 'dist',
		sourceDir: 'public'
	};

	grunt.initConfig({
		project: projectConfig,
		// running `grunt less` will compile once
		less: {
			development: {
				options: {
					paths: ["./public/css"],
					yuicompress: true
				},
				files: {
					"./public/css/client.css": "./public/css/client.less"
				}
			},

			build: {
				options: {
					paths: ["./public/css"],
					yuicompress: true
				},
				files: {
					"./dist/css/client.css": "./public/css/client.less"
				}
			}
		},
		jade: {
			compile: {
				options: {
					client: false,
					pretty: true
				},
				files: [
					{
						src: [
							"public/**/*.jade",
							"!public/src/platform/index/index.jade"
						],
						expand: true,
						ext: ".tpl.html"
					}
				]
			},

			build: {
				options: {
					client: false,
					pretty: true
				},
				files: [
					{
						src: [
							"public/**/*.jade",
							"!public/src/platform/index/index.jade"
						],
						expand: true,
						ext: ".tpl.html"
					}
				]
			}
		},

		// running `grunt watch` will watch for changes
		watch: {
			files: [
				"./public/**/*.less",
				"./public/**/*.jade"
				],
			tasks: ["default"]
		},

		clean: [
			"<%= project.distDir %>"
		],

		copy: {
			target: {
				files: [
					{
						expand: true,
						cwd: '<%= project.sourceDir %>',
						src: [
							'css/**', 'images/**', 'fonts/**', 'lib/**', 'src/**/*.tpl.html', //included
							'!**/*.less', '!**/*.jade', '!src/**/*.js' //omitted
						],
						dest: '<%= project.distDir %>'
					}, {
						expand: true,
						cwd: '<%= project.sourceDir %>',
						src: ['src/platform/index/index.jade'],
						dest: '<%= project.distDir %>'
					}
				]
			}
		},

		concat: {
			build: {
				src: [
//					'<%= project.sourceDir %>/src/charts/*.js',
//					'<%= project.sourceDir %>/src/**/*.js',
//					'<%= project.sourceDir %>/src/**/*.js',
					'<%= project.sourceDir %>/src/**/*.js'
//					'<%= project.sourceDir %>/src/app.js'
				],
				dest: '<%= project.distDir %>/src/app.js'
			}
		},

		uglify: {
			options: {
				mangle: false
			},
			build: {
				files: {
					'<%= project.distDir %>/src/app.js': ['<%= project.sourceDir %>/src/**/*.js']
				}
			}
		},

		cssmin: {
			minify: {
				expand: true,
				cwd: "./public/css/",
				src: ['client.css'],
				dest: "./public/css/",
				ext: '.min.css'
			}
		}
	});

	grunt.registerTask('default', ['less', 'jade', 'watch']);
	grunt.registerTask('build', ['clean', 'less:development', 'cssmin:minify', 'jade:build', 'copy:target', 'uglify:build']);
};