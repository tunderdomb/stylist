
var stylist = require("../stylist")
var path = require("path")

module.exports = function ( grunt ){

  function isDir( dest ){
    return grunt.util._.endsWith(dest, "/")
  }

  grunt.registerMultiTask("pluck", "", function (){
    var options = this.options({
        source: "mustache",
        ignore: ""
      })
      , sourceExt = "." + options.source
      , ignore = ""

    if ( options.ignore ) {
      grunt.file.expand(options.ignore).forEach(function ( src ){
        if( grunt.file.exists(src) ) ignore += grunt.file.read(src)
      })
    }

    this.files.forEach(function ( filePair ){
      if( !filePair.dest || filePair.dest && isDir(filePair.dest) ) {
        var styleExt = filePair.ext || ".styl"
        filePair.src.forEach(function ( src ){
          // if the src is a directory
          // match only the file that named after it"s dir,
          // and has the desired extension
          if ( grunt.file.isDir(src) ) {
            src += path.basename(src) + sourceExt
          }
          if ( !grunt.file.exists(src) ) return
          var name = path.basename(src, path.extname(src))
          var dest = path.join(filePair.dest || path.dirname(src), name + styleExt)
          var styles = grunt.file.exists(dest)
            ? grunt.file.read(dest)
            : ""
          var selectors = stylist.extract(grunt.file.read(src), ignore+styles, styleExt)
          if ( selectors.length ) {
            styles += "\n" + selectors.join("\n")
            grunt.file.write(dest, styles)
            console.log("Plucked:", dest)
          }
        })
      }
      else {
        console.warn("File destination is not supported!")
      }
    })
  })

};