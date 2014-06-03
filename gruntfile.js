module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // minify our JS
    uglify: {
      dist: {
        options: {
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> -  */',
          report: 'gzip',
          sourceMap: true
        },
        files: {
          './scripts/sticky-sauce.min.js': [
            './scripts/sticky-sauce.js'
          ]
        }
      }
    },

    // compile your sass
    sass: {
      dist: {
        options: {
          style: 'compressed',
          loadPath: './bower_components/bootstrap-sass-official/vendor/assets/stylesheets/'
        },
        files: {
          './styles/main.min.css': [
            './styles/main.scss'
          ]
        }
      }
    },

    // watch for changes
    watch: {
      scss: {
        files: ['./styles/*.scss'],
        tasks: [
          'sass:dist',
          'notify:scss'
        ]
      },
      js: {
        files: ['./scripts/*.js'],
        tasks: [
          'uglify:dist',
          'notify:js'
        ]
      },
      livereload: {
        options: {
          livereload: true
        },
        files: ['./*.html','./styles/*.css','./scripts/*.js']
      }
    },

    // notify cross-OS
    notify: {
      scss: {
        options: {
          title: 'Grunt, grunt!',
          message: 'SCSS is all gravy'
        }
      },
      js: {
        options: {
          title: 'Grunt, grunt!',
          message: 'JS is all good'
        }
      }
    },

    connect: {
      livereload: true,
      server: {
        options: {
          port: 9000,
          hostname: 'localhost'
        }
      },
    },

    open: {
      server: {
          path: 'http://localhost:<%= connect.server.options.port %>'
      }
    }

  });

  // Load NPM's via matchdep
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-open');

  // Default task
  grunt.registerTask('default', ['watch']);

  // Run local server
  grunt.registerTask('serve', [
    'connect',
    'open:server',
    'watch'
  ]);

};