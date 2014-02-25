module.exports = function ( grunt ){

  grunt.initConfig({
    stylist: {
//      collection: {
//        src: "test/collection/*.html",
//        ext: ".styl",
//        options: {
//          ignore: "test/ignore/*.styl"
//        }
//      },

      destDefined: {
        expand: true,
        cwd: "test/collection/",
        src: "*.html",
        dest: "test/collection/style/",
        ext: ".less",
        options: {
          ignore: "test/ignore/*.less"
        }
      },

//      module: {
//        expand: true,
//        src: "test/module/*/*.html",
//        ext: ".less",
//        options: {
//          ignore: "test/ignore/*.less"
//        }
//      },

//      source: {
//        expand: true,
//        src: "test/module/*/*.mustache",
//        ext: ".styl",
//        options: {
//          ignore: "test/ignore/*.styl",
//          source: ".mustache"
//        }
//      }
    }
  })

  grunt.loadTasks("tasks")

  grunt.registerTask("default", "", function(  ){
    console.log("Grunt~~")
    grunt.task.run("stylist")
  })
};