/**
 * Stylist.js
 * */

var path = require("path")
  , fs = require("fs")

  , stylist = module.exports = {}

function read( path ){
  return fs.readFileSync(path, "utf8")
}

/**
 *
 * */
stylist.extract = function ( content, options ){
  var ignore = options.ignore || ""
    , style = options.style || "css"
    , selectors = []
    // stylus doesn't have braces
    // other than that, selectors are defined the same way
    , braces = style == "styl" || style == "stylus" ? "" : "{}"

  content.replace(/class\s*=\s*"([^"]+)"|id\s*=\s*"([^"]+)"/g, function ( match, cls, id ){
    if ( cls ) {
      cls.trim().split(/\s+/).forEach(function ( cls ){
        if( !/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*/.test(cls) ) return
        if( new RegExp("\\."+cls+"\\s*" + (braces ? "{" : "(\\n|{)?")).test(ignore) ) return
        cls = "." + cls + braces
        if( !!~selectors.indexOf(cls) ) return
        selectors.push(cls)
      })
    }
    else if ( id ) {
      if( !/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*/.test(id) ) return
      id = "#" + id
      if( new RegExp(id+"\\s*" + (braces ? "{" : "(\\n|{)?")).test(ignore) ) return
      id += braces
      if( !!~selectors.indexOf(id) ) return
      selectors.push(id)
    }
    return match
  })

  return selectors
}