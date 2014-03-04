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

  grunt.registerMultiTask("stylist", "", function (){
    var options = this.options({
      ignore: [],
      style: "less"
    })

    var ignored = getIgnored(options.ignore)

    this.files.forEach(function ( filePair ){
      var dest = filePair.dest
        , style = filePair.orig.ext && filePair.orig.ext.replace(/^\./, "") || options.style || "css"

      filePair.src.forEach(function ( src ){
        if ( !grunt.file.exists(src) ) {
          console.warn("File not found: ", src)
          return
        }

        if ( !dest ) {
          dest = path.join(path.dirname(src), path.basename(src, path.extname(src))+"."+options.style)
        }
        else if ( /\/$/.test(dest) ) {
          dest = path.join(dest, path.basename(src, path.extname(src))+"."+options.style)
        }

        var selectors, existing

        existing = grunt.file.exists(dest)
          ? grunt.file.read(dest)
          : ""

        selectors = stylist.extract(grunt.file.read(src), {
          style: style,
          ignore: ignored+existing
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