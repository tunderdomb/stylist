var stylist = require("../stylist")
var path = require("path")

module.exports = function ( grunt ){

  function getIgnored( ignores ){
    if ( typeof ignores == "string" ) {
      return grunt.file.expand(ignores).map(function( src ){
        return grunt.file.exists(src)
          ? grunt.file.read(src)
          : ""
      }).join("\n")
    }
    else {
      return ignores.map(function( ignore ){
        return grunt.file.expand(ignore).map(function( src ){
          return grunt.file.exists(src)
            ? grunt.file.read(src)
            : ""
        }).join("\n")
      }).join("\n")
    }
  }

  grunt.registerMultiTask("stylist", "Extract selectors from markup", function (){
    var options = this.options({
      ignore: []
    })

    var ignored = null

    this.files.forEach(function ( filePair ){
      var dest = filePair.dest
      if ( !dest ) throw new Error("Destination undefined!")

      var style = filePair.orig.ext && filePair.orig.ext.replace(/^\./, "") || "css"

      filePair.src.forEach(function ( src ){
        if ( !grunt.file.exists(src) ) {
          console.warn("File not found: ", src)
          return
        }

        // slate collecting ignored files until we need them
        ignored = ignored || getIgnored(options.ignore)

        var existing = grunt.file.exists(dest)
          ? grunt.file.read(dest)
          : ""

        var selectors = stylist.extract(grunt.file.read(src), {
          style: style,
          ignore: ignored+existing,
          data: options.data,
          classes: options.classes,
          ids: options.ids
        })

        if ( selectors.length ) {
          existing += "\n" + selectors.join("\n")
          grunt.file.write(dest, existing)
          console.log("Extracted "+selectors.length+" new selectors: "+ dest)
        }
      })
    })
  })
};