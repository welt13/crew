/*jshint quotmark:false */
/* jshint -W003 */

'use strict';


// # Globbing


// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
module.exports = function(grunt) {
    // Toda la configuración de grunt se define a través del método
    // initConfig, que recibe un objeto con las distintas opciones
    // de configuración y nos permite definir las tareas que queremos
    // ejecutar
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-angular-templates');
    // grunt.loadNpmTasks('grunt-stubby');

    // Automatically load required Grunt tasks
    // require('jit-grunt')(grunt, {
    //  useminPrepare: 'grunt-usemin',
    //  ngtemplates: 'grunt-angular-templates',
    //  cdnify: 'grunt-google-cdn'
    // });
    // Configurable paths for the application
    var appConfig = {
        host: 'localhost',
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };
    // Define the configuration for all the tasks
    grunt.initConfig({
        // Cada tarea lleva su propia configuración, dependiente del
        // tipo de tarea concreta
        // Project settings
        yeoman: appConfig,

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        // The actual grunt server settings
        connect: {
            options: {
                port: 9090,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '<%= yeoman.host %>',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            test: {
		        options: {
		        	port: 9001,
		          	middleware: function (connect) {
		            	return [
		            		connect.static('.tmp'),
		              		connect.static('test'),
		              		connect().use('/bower_components',connect.static('./bower_components')),
		              		connect.static(appConfig.app)
		            	];
		          	}
		        }
		    },
            dist: {
                options: {
                    port: 7080,
                    open: true,
                    middleware: function(connect) {
                        return [
                            connect.static(appConfig.dist)
                        ];
                    }
                }
            }
        },
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json']
            },
            js: {
                files: [
                    '<%= yeoman.app %>/**/*.js',
                    '<%= yeoman.app %>/**/**/*.js'
                ],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            html: {
                files:[
                    '<%= yeoman.app %>/index.html',
                    '<%= yeoman.app %>/**/*.html',
                    '<%= yeoman.app %>/**/**/*.html'
                ],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/**/*.scss'],
                tasks: ['compass:server']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '<%= yeoman.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/static/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}']
            }
        },

        // Make sure there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/task-hl/{scripts,sections,modals}/{,*/}*.js'
                ]
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.app %>/static/images',
                generatedImagesDir: '.tmp/images/generated',
                httpGeneratedImagesPath: '/images/generated',
                httpImagesPath: '/static/images',
                fontsDir: '<%= yeoman.app %>/static/fonts',
                httpFontsPath: '/static/fonts',
                importPath: './bower_components',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: false
                }
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/{scripts,sections,modals}/{,*/}*.js',
                    '<%= yeoman.dist %>/styles/{,*/}*.css',
                    '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },
        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/scripts', '<%= yeoman.dist %>/images', '<%= yeoman.dist %>/styles', '<%= yeoman.dist %>/sections', '<%= yeoman.dist %>/modals']
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/static/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['{,*/}*.html', 'task-hl/views/{,*/}*.html', 'task-hl/scripts/directives/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'task-hl/views/{,*/}*.html',
                        'task-hl/images/{,*/}*.{webp}',
                        'task-hl/static/{,*/}*',
                        'task-hl/sections/**/*.html',
                        'task-hl/sections/**/**/*.html',
                        'task-hl/modals/**/*.html'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    cwd: '.',
                    src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
                    dest: '<%= yeoman.dist %>'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
		    test: [
		    	'compass'
		    ],
            dist: [
                'compass:dist',
                'imagemin',
                'svgmin'
            ]
        }        
    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }
        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'connect:livereload',
            'jshint',
            'watch'
        ]);
    });
    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });
    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'concat',
        'ngmin',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);
    grunt.registerTask('default', [
        'newer:jshint',
        'build'
    ]);
    grunt.registerTask('dist', [
        'connect:dist',
        'watch'
    ]);
};

/* jshint +W003 */