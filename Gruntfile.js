module.exports = function (grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      src: ["public/js/app/*.js", "public/js/app/**/*.js"],
      options: {
        specs: "spec/app/**/*.js",
        helpers: "spec/support/**/*.js",
        vendor: "public/js/vendor/**/*.js"
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-jasmine')

  grunt.registerTask('test', ['jasmine'])
  grunt.registerTask('default', ['test'])
};
