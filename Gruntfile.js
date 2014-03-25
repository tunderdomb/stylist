module.exports = function ( grunt ){

  grunt.initConfig({
    stylist: {
      extract: {
        options: {
          classes: true,
          ids: true,
          data: true,
          ignore: "test/style/globals/*.less"
        },
        expand: true,
        cwd: "test/markup/",
        src: "*.html",
        dest: "test/style/",
        ext: ".css"
      }
    }
  })

  grunt.loadTasks("tasks")

  grunt.registerTask("default", "", function(  ){
    console.log("Grunt~~")
    grunt.task.run("stylist")
  })
};