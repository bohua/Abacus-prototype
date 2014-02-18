module.exports = function (grunt) {
	grunt.initConfig({
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
						cwd: "public",
						src: "**/*.jade",
						expand: true,
						ext: ".html"
					}
				]
			}
		},

		// running `grunt watch` will watch for changes
		watch: {
			files: "./public/**/*.less",
			tasks: ["less"]
		}
	});
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['less', 'jade', 'watch']);
};