module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		sass: {
			options: {
				sourceMap: false
			},
			dist: {
				files: {
					'app/styles/shared.css'		: 'app/styles/shared.scss',

					'app/styles/worker.css'		: 'app/styles/worker.scss',

					'app/styles/login.css'		: 'app/styles/login.scss',
					'app/styles/home.css'		: 'app/styles/home.scss',
					'app/styles/estado.css'		: 'app/styles/estado.scss',
					'app/styles/perfil.css'		: 'app/styles/perfil.scss',
					'app/styles/terminado.css'	: 'app/styles/terminado.scss'
				}
			}
		},
		shell: {
			serve: {
				command: 'serve -p 3000'
			},
			serve_prod: {
				command: 'serve -p 80'
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'app/styles',
					src: ['*.css', '!*.min.css'],
					dest: 'app/styles',
					ext: '.min.css'
				}]
			}
		},
		watch: {
			sass: {
				files: ['**/*.scss'],
				tasks: ['sass']
			},
			cssmin: {
				files: ['**/*.css'],
				tasks: ['cssmin']
			}
		},
		concurrent: {
			serve: ['shell:serve', 'watch:sass', 'watch:cssmin'],
			serve_prod: ['shell:serve_prod', 'watch:sass', 'watch:cssmin']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('serve', [
		'sass',
		'cssmin',
		'concurrent:serve'
	]);

	grunt.registerTask('serve_prod', [
		'sass',
		'cssmin',
		'concurrent:serve_prod'
	]);
};
