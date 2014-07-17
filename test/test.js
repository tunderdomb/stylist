var assert = require('chai').assert
  , stylist = require("../stylist")
  , markup = require("fs").readFileSync("test/test.html", "utf-8")
  , ignore = "\
      .ignore-me{\
        background: none\
      }\
      #ignore-me-too{}\
      #me-too{}\
      [data-ignore]{}\
      [data-ignore=\"something\"]{\
        background: none\
      }\
    "

describe('stylist', function(){

  describe('.extract()', function(){
    it('should extract ids and classes', function(){
      var selectors = stylist.extract(markup)
      assert.lengthOf(selectors, 6, '2 ids and 4 classes')
    })
    it('should extract ids and classes and ignore already defined ones', function(){
      var selectors = stylist.extract(markup, {ignore: ignore})
      assert.lengthOf(selectors, 4, '1 unique id and 3 unique classes')
    })


    it('should extract only ids', function(){
      var selectors = stylist.extract(markup, {ids: true, classes: false, data: false})
      assert.lengthOf(selectors, 2)
    })
    it('should extract only ids and ignore already defined ones', function(){
      var selectors = stylist.extract(markup, {ignore: ignore, ids: true, classes: false, data: false})
      assert.lengthOf(selectors, 1)
    })


    it('should extract only classes', function(){
      var selectors = stylist.extract(markup, {ids: false, classes: true, data: false})
      assert.lengthOf(selectors, 4)
    })
    it('should extract only classes and ignore already defined ones', function(){
      var selectors = stylist.extract(markup, {ignore: ignore, ids: false, classes: true, data: false})
      assert.lengthOf(selectors, 3)
    })

    it('should extract only data attributes', function(){
      var selectors = stylist.extract(markup, {ids: false, classes: false, data: true})
      assert.lengthOf(selectors, 5)
    })

    it('should extract only data attributes', function(){
      var selectors = stylist.extract(markup, {ignore: ignore, ids: false, classes: false, data: true})
      assert.lengthOf(selectors, 4)
    })
  })
})
