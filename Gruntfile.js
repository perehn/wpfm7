module.exports = function(grunt) {
  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "css/main.css": "css/main.less"
        }
      }
    },
    watch: {
      styles: {
        files: ['css/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },
    cancompile: {
        options: {
          version: '2.1.2'
        },
        dist: {
          options: {
            
            wrapper : 'require(["can"], function(){ {{{content}}} });'
          },
          src: ['app/**/*.mustache'],
          dest: 'views.production.js'
        }
      },
    exec: {
    	buildrjs : {
    		cmd : 'r.js -o build.js'
    	}
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('can-compile');
  grunt.loadNpmTasks('grunt-exec');
  
  grunt.registerTask('default', ['less','watch']);
  
  grunt.registerTask('buildcan', ['cancompile']);
  grunt.registerTask('buildall', [ 'cancompile', 'exec']);

};