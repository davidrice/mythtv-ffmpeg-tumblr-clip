module.exports = function(grunt) {

	grunt.initConfig({
		browserify: {
			options: {
				transform: [ require('grunt-react').browserify ]
			},
			main: {
				src: 'public/**.js',
				dest: 'public/build/mythtv-ffmpeg-tumblr-clip.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-react');
};
