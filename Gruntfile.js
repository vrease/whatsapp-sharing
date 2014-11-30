module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
    	all: {
    		src: ['dist', 'build']
    	},
    	build: {
	    	src: ['build']
    	}
    },
	copy: {
		html: {
			src: 'src/index.html', dest: 'dist/index.html'
		},
		cname: {
			src: 'cname/CNAME', dest: 'dist/CNAME'	
		},
		images: {
			cwd: 'src/', expand: true, src: 'assets/img/**', dest: 'dist/'
		},
		button: {
			src: 'src/button/dist/whatsapp-button.js', dest: 'dist/assets/js/whatsapp-button.js'
		}
	},	
	dataUri: {
		dist: {
			src: ['src/button/src/*.css'],
			dest: 'build/',
			options: {
				target: ['**'],
				fixDirLevel: true
			},
		},
	},
	cssmin: {
		combine: {
			files: {
				'dist/assets/css/style.min.css': ['src/assets/css/style.css', 'build/button.css']
			}
		}
	},
	uglify: {
		options: {
			mangle: false
		},
		dist: {
			files: {
				'dist/assets/js/generator.min.js': ['src/assets/js/generator.js']
			}
		},
		buttonreplacement: {
			files: {
				'dist/button': ['src/button-replacement/button.js']
			}
		}
	 },
	'gh-pages': {
		options: {
			base: 'dist/'
		},
		src: ['**/*']
	}
  });
  grunt.loadNpmTasks('grunt-update-submodules');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-data-uri');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.registerTask('default', ['clean:all', 'copy', 'dataUri', 'cssmin', 'uglify:dist', 'clean:build']);
  grunt.registerTask('deploy', ['default', 'gh-pages']);
};