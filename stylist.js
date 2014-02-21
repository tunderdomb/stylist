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
        if ( /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*/.test(cls) ) {
          cls = "." + cls
          if( !new RegExp(cls+"\\s*" + (braces ? "{" : "(\\n|{)?")).test(ignore) )
            selectors.push(cls + braces)
        }
      })
    }
    else if ( id ) {
      id = "#" + id
      if( !ignore || !new RegExp(id+"\\s*" + (braces ? "{" : "(\\n|{)?")).test(ignore) )
        selectors.push(id + braces)
    }
    return match
  })

  return selectors
}