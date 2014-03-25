module.exports = function ( grunt ){

  grunt.initConfig({
    stylist: {

      // test/collection/hey.html  ->  test\collection\hey.styl
      // test/collection/ho.html  ->  test\collection\hey.styl
      noDest: {
        src: "test/collection/*.html",
        options: {
          ignore: "test/ignore/*.styl"
        }
      },

      // test/collection/hey.html  ->  test\collection\hey.styl
      // test/collection/ho.html  ->  test\collection\hey.styl
      simpleDest: {
        src: "test/collection/*.html",
        dest: "test/collection/",
        options: {
          ignore: "test/ignore/*.styl"
        }
      },

      // test/collection/hey.html  ->  hey.html
      // test/collection/ho.html  ->  ho.html
      expandNoDest: {
        expand: true,
        cwd: "test/collection/",
        src: "*.html",
        options: {
          ignore: "test/ignore/*.less"
        }
      },

      // test/collection/hey.html  ->  test/collection/style/hey.less
      // test/collection/ho.html  ->  test/collection/style/ho.less
      expandDest: {
        expand: true,
        cwd: "test/collection/",
        src: "*.html",
        dest: "test/collection/style/",
        ext: ".less",
        options: {
          ignore: "test/ignore/*.less"
        }
      },

      // test/module/default/default.html  ->  test/module/default/default.less
      expandExt: {
        expand: true,
        src: "test/module/*/*.html",
        ext: ".less",
        options: {
          ignore: "test/ignore/*.less"
        }
      },

      // test/module/mustache/mustache.mustache  ->  test/module/mustache/mustache.styl
      source: {
        expand: true,
        src: "test/module/*/*.mustache",
        ext: ".styl",
        options: {
          ignore: "test/ignore/*.styl"
        }
      }
    }
  })

  grunt.loadTasks("tasks")

  grunt.registerTask("default", "", function(  ){
    console.log("Grunt~~")
    grunt.task.run("stylist")
  })
};