module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {

			scripts: {
				files: ['src/js/**/*.js'],
				tasks: ['concat:dist', 'uglify:development'],
			},
			css: {
				files: 'src/css/**/*.less',
				tasks: ['less:development']
			}

		},

		concat : {
			dist : {
				src  : [
					'src/js/lib/stats.js',

					'src/js/first.js',
					'src/js/lib/lcg.js',
					'src/js/lib/sonantx.js',
					'src/js/assets.js',
					'src/js/lib/Engine.js',

					'src/js/main.js',
					'src/js/world/world.js',
					'src/js/lib/sound.js',
					'src/js/player.js',
					'src/js/particle.js',
					//'src/js/pool.js',
					'src/js/states/gameoverstate.js',
					'src/js/states/menustate.js',
					'src/js/states/gamestate.js',
					'src/js/states/spritestate.js',

					//'src/js/lib/CCapture.all.min.js',

					'src/js/lib/input.js',
					'src/js/lib/txt.js',

					'src/js/last.js'
				],
				dest : 'build/concat.js'
			}
		},

		inline: {
			dist: {
				options:{
					tag: '',
					cssmin: true
				},
				src: 'build/index.html',
				dest: 'dist/index.html'
			}
		},

		uglify: {
			development: {
				options: {
					mangle: false,
				},
				files: {
					'build/game.js':
					[
						'build/concat.js'
					]
				}
			},
			compressed: {
				options: {
					//reserveDOMCache: true,
					 nameCache: 'grunt-uglify-cache.json',
					 mangle: {
							// 	properties: {
							// 		builtins: false,
							// 		//regex: /fillRect|left|right|top|bottom|xspeed|yspeed|fillTriangle|player|renderTarget|renderSource/
							// 		//domprops: false,
							//
							// }
					}
					//mangle: true


				},

				files: {
					'build/game.js':
						[
							'build/concat.js'
						]
				}
			}
		},
		less: {
			development: {
				files: {
					"build/style.css": "src/css/*.less"
				}
			},
			compressed: {
				files: {
					"build/style.css": "src/css/*.less"
				},
				compress: true,
			}
		},

		htmlmin: {
			development: {
				options: {
					removeComments: false,
					collapseWhitespace: false,
				},
				files: {
					'build/index.html': 'src/index.html'
				}
			},
			compressed: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
				},
				files: {
					'build/index.html': 'src/index.html'
				}
			}
		},

		compress: {
			main: {
				options: {
					archive: 'dist/game.zip',
					mode: 'zip',
					level: 9,
				},
				files: [{
					expand: true,
					flatten: true,
					cwd: './',
					src: ['dist/index.html'],
					dest: './'
				}]
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-inline');

	var fs = require('fs');
	grunt.registerTask('sizecheck', function() {
		var done = this.async();
		fs.stat('dist/game.zip', function(err, zip) {
			if (zip.size > 13312) {
				//If size in bytes greater than 13kb
				grunt.log.error("Zipped file greater than 13kb \x07 \n");
				grunt.log.error("Zip is " + zip.size + " bytes when js13k max is 13,312 bytes");
			}
			done();
		});
	});

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['concat:dist', 'less:development', 'htmlmin:development',] );
	grunt.registerTask('build-compress', ['concat:dist', 'less:compressed', 'htmlmin:compressed', 'uglify:compressed', 'inline:dist', 'compress:main', 'sizecheck']);
	//grunt.registerTask('build-compress', ['concat:dist','closure-compiler', 'less:compressed', 'htmlmin:compressed', 'inline:dist', 'compress:main', 'sizecheck']);
	grunt.registerTask('serve', ['concat:dist','express','watch']);
};
