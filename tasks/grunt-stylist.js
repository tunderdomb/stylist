var stylist = require("../stylist")
var path = require("path")

module.exports = function ( grunt ){

  function isDir( dest ){
    return grunt.util._.endsWith(dest, "/")
  }

  // if the src is a directory
  // match only the file that named after it"s dir,
  // and has the desired extension
  function getSrc( src, ext ){
    return grunt.file.isDir(src)
      ? src += path.basename(src) + ext
      : src
  }

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
      source: ".html",
      style: "styl"
    })

    this.files.forEach(function ( filePair ){
      var ignored
        , dest

      // use original destination
      dest = filePair.orig.dest
      filePair.src.forEach(function ( src ){
        if ( dest && !isDir(dest) ) {
          console.warn("File destinations are not supported: ", dest)
          return
        }
        src = getSrc(src, options.source)
        if ( !grunt.file.exists(src) ) {
          console.warn("File not found: ", src)
          return
        }

        // slate fetching ignored files until they are really needed
        ignored = ignored || getIgnored(options.ignore)
        options.style = filePair.ext && filePair.ext.replace(/^\./, "") || options.style || "css"
        var name = path.basename(src, path.extname(src))
        var dest
        // TODO if expanded pair, handle dest path
        if ( filePair.orig.expand ) {
          dest = filePair.dest
        }
        else {
          dest = path.join(filePair.dest || path.dirname(src), name + "."+options.style)
        }
        var existing = grunt.file.exists(dest)
          ? grunt.file.read(dest)
          : ""

        options.ignore = ignored+existing
        var selectors = stylist.extract(grunt.file.read(src), options)

        if ( selectors.length ) {
          existing += "\n" + selectors.join("\n")
          grunt.file.write(dest, existing)
          console.log("Extracted "+selectors.length+" new selectors: "+ dest)
        }
      })
    })
  })
};