/**
 * Stylist.js
 * */

var uncss = require("uncss")
var CleanCSS = require("clean-css")
var autoprefixer = require("autoprefixer")
var less = require("less")
var stylus = require("stylus")
var path = require("path")
var fs = require("fs")

var stylist = module.exports = {}

/**
 *
 * */
stylist.extract = function ( content, ignore, format ){
  if ( !format ) {
    if ( typeof ignore == "string" ) {
      format = ignore
      ignore = ""
    }
    else {
      format = "css"
      ignore = ""
    }
  }

  var selectors = []
    , braces = format == "styl" || format == "stylus" ? "" : "{}"

  content.replace(/class\s*=\s*"([^"]+)"|id\s*=\s*"([^"]+)"/g, function ( match, cls, id ){
    if ( cls ) {
      cls.trim().split(/\s+/).forEach(function ( cls ){
        if ( /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*/.test(cls) ) {
          cls = "." + cls + braces
          if ( !!~ignore.indexOf(cls) ) return
          selectors.push(cls)
        }
      })
    }
    else if ( id ) {
      id = "#" + id + braces
      if ( !!~ignore.indexOf(id) ) return match
      selectors.push(id)
    }
    return match
  })
  return selectors
}

/**
 *
 * */
stylist.render = function ( file, options, done ){
  switch ( path.extname(file) ) {
    case ".css":
      done(null, fs.readFileSync(file, "utf8"))
      break
    case ".less":
      less.render(fs.readFileSync(file, "utf8"), options, function ( err, css ){
        done(err, css)
      })
      break
    case ".styl":
    case ".stylus":
      stylus.render(fs.readFileSync(file, "utf8"), options, function ( err, css ){
        done(err, css)
      });
      break
  }
}

/**
 *
 *
 //  var files   = ['my', 'array', 'of', 'HTML', 'files'],
 * options = {
//      ignore       : ['#added_at_runtime', /test\-[0-9]+/],
//      media        : ['(min-width: 700px) handheld and (orientation: landscape)'],
//      csspath      : '../public/css/',
//      raw          : 'h1 { color: green }',
//      stylesheets  : ['lib/bootstrap/dist/css/bootstrap.css', 'src/public/css/main.css'],
//      ignoreSheets : [/fonts.googleapis/],
//      urls         : ['http://localhost:3000/mypage', '...'] // Deprecated
//      timeout      : 1000,
//      report       : true,
//      htmlroot     : 'public'
//    };
 *
 * CleanCSS constructor accepts a hash as a parameter, i.e., new CleanCSS(options).minify(source) with the following options available:

 keepSpecialComments - * for keeping all (default), 1 for keeping first one only, 0 for removing all
 keepBreaks - whether to keep line breaks (default is false)
 benchmark - turns on benchmarking mode measuring time spent on cleaning up (run npm run bench to see example)
 root - path to resolve absolute @import rules and rebase relative URLs
 relativeTo - path with which to resolve relative @import rules and URLs
 processImport - whether to process @import rules
 noRebase - whether to skip URLs rebasing
 noAdvanced - set to true to disable advanced optimizations - selector & property merging, reduction, etc.
 selectorsMergeMode - ie8 for IE8 compatibility mode, * for merging all (default)
 debug - set to true to get minification statistics under stats property (see test/custom-test.js for examples)
 * */
stylist.compile = function ( content, htmls, options, done ){
  // uncss
  uncss(htmls, options, function ( error, output, report ){
    // report
//    console.log('Original: ', report.original/1000, 'kilobytes')
//    console.log('Tidy: ', report.tidy/1000, 'kilobytes')
    // prefix
    var prefixed = autoprefixer.process(output).css
    // minify
    var minimized = new CleanCSS(options).minify(prefixed)
    done(minimized)
  })

}