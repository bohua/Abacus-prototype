module.exports = function(grunt) {
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
		// running `grunt watch` will watch for changes
		watch: {
			files: "./public/**/*.less",
			tasks: ["less"]
		}
	});
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
};