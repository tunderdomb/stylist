module.exports = function ( grunt ){

  grunt.initConfig({
    stylist: {
      collection: {
        expand: true,
        src: "test/collection/*.html",
        ext: ".styl",
        options: {
          ignore: "test/ignore/*.styl"
        }
      },
      destDefined: {
        expand: true,
        src: "test/collection/*.html",
        dest: "test/collection/style/",
        ext: ".less",
        options: {
          ignore: "test/ignore/*.less"
        }
      },
      module: {
        expand: true,
        src: "test/module/*/",
        ext: ".less",
        options: {
          ignore: "test/ignore/*.less"
        }
      },
      source: {
        expand: true,
        src: "test/module/*/",
        ext: ".styl",
        options: {
          ignore: "test/ignore/*.styl",
          source: ".mustache"
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