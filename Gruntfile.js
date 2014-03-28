module.exports = function(grunt) {

    // Initialize the grunt configuration
    grunt.initConfig({
        // Import the package configuration
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            bootstrap: {
                files: [
                    {
                        cwd: 'bower_components/bootstrap/dist/js/',
                        src: '*.min.js',
                        dest: 'assets/js/lib/',
                        filter: 'isFile',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/bootstrap/dist/css/',
                        src: '*.min.css',
                        dest: 'assets/css/',
                        filter: 'isFile',
                        expand: true
                    },
                    {
                        cwd: 'bower_components/bootstrap/dist/fonts',
                        src: '**',
                        dest: 'assets/fonts/',
                        filter: 'isFile',
                        expand: true
                    }
                ]
            },

            jquery: {
                src: 'bower_components/jquery/dist/jquery.min.js',
                dest: 'assets/js/lib/jquery.min.js'
            },

            d3: {
                src: 'bower_components/d3/d3.min.js',
                dest: 'assets/js/lib/d3.min.js'
            },

            moment: {
                src: 'bower_components/moment/moment.js',
                dest: 'assets/js/lib/moment.js'
            },

            topojson: {
                src: 'bower_components/topojson/topojson.js',
                dest: 'assets/js/lib/topojson.js'
            },

            underscore: {
                src: 'bower_components/underscore/underscore.js',
                dest: 'assets/js/lib/underscore.js'
            },

            backbone: {
                src: 'bower_components/backbone/backbone.js',
                dest: 'assets/js/lib/backbone.js'
            }
        },

        less: {
            dist: {
                options: {
                    paths: ['assets/css']
                },
                files: {
                    'assets/css/book.css': "less/book.less"
                }
            }
        }

    });

    // Enable the grunt plugins
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');


    // Register Tasks

    grunt.registerTask('build', ['copy']);
    grunt.registerTask('dist', ['build']);
    grunt.registerTask('default', ['build']);


};