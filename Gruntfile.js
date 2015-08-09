/**
 * @author Aleksey Krasnobaev <a.krasnobaev@bdo.ru>
 *
 * In order to use resContext option for openui5_connect
 * you need to patch grunt-openui5
 * [grunt-openui5 patch]{@link https://github.com/krasnobaev/grunt-openui5/commit/da4d0b123ecda852224d200a5d3112e4d0e42499}
 *
 * build process based on [this]{@link http://scn.sap.com/people/sathishkv/blog/2014/09/04/building-your-sap-ui5-application-using-grunt} article
 */
'use strict';
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.config.init({
    // load package information
    pkg: grunt.file.readJSON('package.json'),

    /**
     * build process
     */
    clean: {
      prepare: [
        '<%= pkg.dirs.stage %>*',
        '<%= pkg.dirs.process %>*',
        '<%= pkg.dirs.finalize %>*',
        '<%= pkg.dirs.out %>*',
      ],
      // process: {},
      finalize: [
        '<%= pkg.dirs.stage %>',
        '<%= pkg.dirs.process %>',
        '<%= pkg.dirs.finalize %>',
      ],
    },

    copy: {
      prepare: {
        cwd: '<%= pkg.dirs.src %>',
        src: [
          '**/*',
          '!data/**',
          '!util/MockServer.js',
          '!META-INF/**',
          '!WEB-INF/**',
          '!test/**',
          '!test_local.html',
          '!index_local.html',
        ],
        dest: '<%= pkg.dirs.stage %>',
        expand: true,
      },
      process: {
        cwd: '<%= pkg.dirs.stage %>',
        src: [
          '**/*.js', '**/*.html', '**/*.xml', '**/*.jpg', '**/*.png',
          '**/*.gif', '**/*version.json', '**/*.properties', '**/*.css',
        ],
        dest: '<%= pkg.dirs.process %>',

        expand: true,
        rename: function (dest, src) {
          var aSrc = src.split('.');
          var ext = aSrc.pop();
          if (ext === 'js') {
            if (aSrc.length > 1) {
              if (aSrc[aSrc.length - 1] === 'controller') {
                ext = aSrc.pop() + '.' + ext;
              }
            }
            return dest + aSrc.join('.') + '-dbg.' + ext;
          } else {
            return dest + src;
          }
        },
      },
      finalize: {
        cwd: '<%= pkg.dirs.process %>',
        src: ['**/*'],
        dest: '<%= pkg.dirs.out %>',
        expand: true,
      },
    },

    // stub
    jshint: {
      process: {
        options: {
          eqeqeq: true,
          es3: true,
          unused: true,
          eqnull: true,
          camelcase: true,
          laxbreak: true,
          force: true,
          reporter: 'jshint-reporter',
          reporterOutput: '<%= pkg.dirs.out %>JSHint.csv',
        },
        src: '<%= pkg.dirs.stage %>**/*.js',
      },
    },

    // stub
    reporter: function (res) {
      var len = res.length;
      var str = '';
      // Header
      str += 'Filepath , Type, Code, Line , Column , Reason , Evidence \n';
      res.forEach(function (r) {
        var file = r.file;
        var err = r.error;
        str += [
          file, err.id, err.code, err.line,
          err.character, err.reason, err.evidence,
        ].join(', ') + '\n';
      });
      if (str) {
        process.stdout.write(str);
      }
    },

    uglify: {
      options: {
        mangle: true,
        compress: {
          drop_console: true,
          dead_code: false,
          unused: false,
        },
      },
      files: {
        expand: true,
        cwd: '<%= pkg.dirs.stage %>',
        src: ['**/*.js', '!test/**', '!test_local.html'],
        dest: '<%= pkg.dirs.process %>',
      },
    },

    /**
     * copy *.js and *.controller.js files to create the dbg version
     */
    concat: {
      process: {
        files: [{
          expand: true,
          cwd: '<%= pkg.dirs.stage %>',
          src: [
            '**/*.js', '**/*.html', '**/*.xml', '**/*.jpg', '**/*.png',
            '**/*.gif', '**/*version.json', '**/*.properties',
          ],
          dest: '<%= pkg.dirs.process %>',
          rename: function (dest, src) {
            var aSrc = src.split('.');
            var ext = aSrc.pop();
            if (ext === 'js') {
              if (aSrc.length > 1) {
                if (aSrc[aSrc.length - 1] === 'controller') {
                  ext = aSrc.pop() + '.' + ext;
                }
              }
              return dest + aSrc.join('.') + '-dbg.' + ext;
            } else {
              return dest + src;
            }
          },
        }],
      },
    },

    compress: {
      finalize: {
        options: {
          archive:
            '<%= pkg.dirs.build %>' +
            '<%= pkg.name %>' + '-v' + '<%= pkg.version %>' +
            '.zip',
        },
        files: [{
          cwd: '<%= pkg.dirs.finalize %>',
          src: '**/*',
          dest: '',
          expand: true,
        }],
      },
    },

    jsdoc: {
      dist: {
        src: ['src', 'README.md'],
        jsdoc: './node_modules/.bin/jsdoc',
        options: {
          destination: 'build/out/doc/',
          recurse: true,
        },
      },
    },

    /**
     * run a local web server with application
     */
    connect: {
      dev: {
        options: {
          open: 'http://localhost:8000/<%= pkg.urlprefix %>',
          port: 8000,
          useAvailablePort: true,
          debug: true,
          keepalive: true,
        },
      },
      dist: {
        options: {
          open: 'http://localhost:8000/<%= pkg.urlprefix %>',
          port: 8000,
          useAvailablePort: true,
          // debug: true,
          keepalive: true,
        },
      },
    },
    openui5_connect: {
      dev: {
        options: {
          contextpath: '<%= pkg.urlprefix %>',
          appresources: ['<%= pkg.dirs.src %>'],
          resContext: 'sap/ui5/1/resources',
          resources: ['<%= pkg.dirs.sapui5 %>'],
        },
      },
      dist: {
        options: {
          contextpath: '<%= pkg.urlprefix %>',
          appresources: ['<%= pkg.dirs.out %>'],
          resContext: 'sap/ui5/1/resources',
          resources: ['<%= pkg.dirs.sapui5 %>'],
        },
      },
    },

    /**
     * make component preload
     */
    openui5_preload: {
      component: {
        options: {
          resources: {
            cwd: '<%= pkg.dirs.src %>',
            prefix: 'sampleapp',
          },
          dest: '<%= pkg.dirs.process %>',
        },
        components: 'sampleapp',
      },
      // @todo make library preload
    },

  });

  grunt.registerTask('default', ['startserver']);

  grunt.registerTask('startserver', function (mode) {
    grunt.task.run('openui5_connect:' + (mode || 'dev'));
  });

  grunt.registerTask('build', [
    'clean:prepare',
    'copy:prepare',
    // 'jshint:process',
    'uglify',
    /*'concat:process',*/ 'openui5_preload',
    // 'clean:process', //?
    'copy:process',
    // 'concat:finalizeJS', //?
    // 'concat:finalizeML', //?
    // 'concat:finalizeProp', //?
    'copy:finalize',
    // 'updateVersion',
    'jsdoc',
    'compress:finalize',
    'clean:finalize',
  ]);

  // grunt.registerTask('rebuild', ['clean:finalize']);
};
