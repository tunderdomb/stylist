Stylist.js
=========

Extract selectors from files into a stylesheet,
or append them to one, keeping existing rules.
Optionally ignore rules declared in elsewhere,
matched by a glob pattern.

The purpose of this task is to help automate stylsheet creation.
The problem arises when you begin the project with structuring
the markup, and on the way you define classes and ids.
When there's time to create styles for them, you have to rewrite those selectors.

With stylist, you only have to write these selectors once, and set where those stylesheets should be placed.

The inteded usage is with alongside a watch task,
so you can just write markup, and have stylist generate the sheets for you.

Stylist also keeps existing sheets, so if you define a new class in a html, the selector will be appended.
This way, you can continuously write selectors and have them generated in stylsheets.

## Install

    npm install stylist --save-dev

## Grunt task

    grunt.loadNpmTasks('stylist');

## Usage


```js

grunt.initConfig({
  stylist: {
    // write or append selectors into stylus files right next to the htmls
    // files will be named after the htmls
    collection: {
      src: "test/collection/*.html",
      ext: ".styl",
      options: {
        ignore: "test/ignore/*.styl"
      }
    },

    // write or append selectors into less files into another dir
    // maintaining relative folder hierarchy
    // files will be named after the htmls
    destDefined: {
      expand: true,
      cwd: "test/collection/",
      src: "*.html",
      dest: "test/collection/style/",
      ext: ".less",
      options: {
        ignore: "test/ignore/*.less"
      }
    },

    // write or append selectors into less files right next to the htmls
    // files will be named after the htmls
    module: {
      expand: true,
      src: "test/module/*/*.html",
      ext: ".less",
      options: {
        ignore: "test/ignore/*.less"
      }
    },

    // write or append selectors into stylus files right next to the mustache templates
    // files will be named after the templates
    source: {
      expand: true,
      src: "test/module/*/*.mustache",
      ext: ".styl",
      options: {
        ignore: "test/ignore/*.styl",
        source: ".mustache"
      }
    }
  }
})

```

## LICENCE

Copyright (c) 2014 Nagy Zoltan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.