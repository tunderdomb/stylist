/**
 * Stylist.js
 * */

var stylist = module.exports = {}

/**
 * Extract selectors from markup files.
 *
 * @param content{String} the input markup
 * @param options{Object} extract options
 *                        default: {}
 *
 * @param options.ignore{String} contains already defined selectors
 *                               default: ""
 * @param options.style{String} the stylesheet flavor of the output (css, less, styl, stylus, sass)
 *                              it only affects whether declaration has braces or not.
 *                              default: "css"
 * @param options.classes{Boolean} extract classes. default: true
 * @param options.ids{Boolean} extract ids. default: true
 * @param options.data{Boolean} extract data attributes. default: false
 * */
stylist.extract = function ( content, options ){
  options = options || {}
  var ignore = options.ignore || ""
    , style = options.style || "css"
    , extractClasses = options.classes == undefined ? true : options.classes
    , extractIds = options.ids == undefined ? true : options.ids
    , extractDataAttributes = !!options.data
    , selectors = []
    // stylus doesn't have braces
    // other than that, selectors are defined the same way
    , braces = style == "styl" || style == "stylus" ? "" : "{}"
    , validSelector = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/
    , match = /\s(?:class\s*=\s*"([^"]+)"|id\s*=\s*"([^"]+)"|(data-[^=\s\/>]+)(?:\s*=\s*"([^"]+)")?)/g

  function isDefinedElsewhere( selector ){
    selector = selector.replace(/([\.\[\]])/g, "\\$1") // escape regexp entities
    // match selectors as part of a selector chain, not just as key parts
    return new RegExp(selector).test(ignore)
  }

  content
    .replace(/<!--[\w\W]+?-->/g, "") // ignore anything between comments
    .replace(match, function ( match, cls, id, dataAttr, dataVal ){
      if ( cls && extractClasses ) {
        cls.trim().split(/\s+/).forEach(function ( cls ){
          if ( !validSelector.test(cls) ) return
          if ( ignore && isDefinedElsewhere("." + cls) ) return
          cls = "." + cls + braces
          if ( !~selectors.indexOf(cls) ) selectors.push(cls)
        })
      }
      else if ( id && extractIds ) {
        if ( !validSelector.test(id) ) return match
        id = "#" + id
        if ( ignore && isDefinedElsewhere(id) ) return match
        id += braces
        if ( !~selectors.indexOf(id) ) selectors.push(id)
      }
      else if ( dataAttr && extractDataAttributes ) {
//        if ( dataVal ) dataAttr += '="' + dataVal + '"'
        // left here for future possibility
        // but for now the approach is to ignore data attribute values
        // because their values tend to be more dynamic
        // account for attributes without values like <input data-hidden>
        if ( ignore && isDefinedElsewhere("[" + dataAttr) ) return match
        dataAttr = "[" + dataAttr + "]" + braces
        if ( !~selectors.indexOf(dataAttr) ) selectors.push(dataAttr)
      }
      return match
    })

  return selectors
}
