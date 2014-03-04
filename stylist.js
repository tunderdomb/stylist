/**
 * Stylist.js
 * */

var stylist = module.exports = {}

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
    , validSelector = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/

  function isDefinedElsewhere( selector ){
    return new RegExp(selector+"\\s*" + (braces ? "{" : "(\\n|{)?")).test(ignore)
  }

  content.replace(/class\s*=\s*"([^"]+)"|id\s*=\s*"([^"]+)"/g, function ( match, cls, id ){
    if ( cls ) {
      cls.trim().split(/\s+/).forEach(function ( cls ){
        if( !validSelector.test(cls) ) return
        if( isDefinedElsewhere("\\."+cls) ) return
        cls = "." + cls + braces
        if( !!~selectors.indexOf(cls) ) return
        selectors.push(cls)
      })
    }
    else if ( id ) {
      if( !validSelector.test(id) ) return match
      id = "#" + id
      if( isDefinedElsewhere("\\"+id) ) return match
      id += braces
      if( !!~selectors.indexOf(id) ) return match
      selectors.push(id)
    }
    return match
  })

  return selectors
}