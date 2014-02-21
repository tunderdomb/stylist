Stylist.js
=========

Extract selectors from html into a stylesheet,
or append them to one, keeping existing rules.
Optionally ignore rules declared in elsewhere.

## Modes

### Collection

You can set up the grunt task to parse multiple files from a directory,
extracting selectors from each, and writing them into a stylesheet named after the parsed file (e.g. a .html).

### Module

When the grunt task target matches a directory, only the file named after the directory will be matched and parsed.

## Install

    npm install stylist --save-dev

## Grunt task

    grunt.loadNpmTasks('stylist');

## Usage


```js
    grunt.initConfig({
      stylist: {
        collection: {
          // parse every file
          // generate stylesheets into the same dir named after the html
          src: "test/collection/*.html",
          // generate stylus style files
          ext: ".styl",
          options: {
            // ignore selectors defined in files matched by this glob pattern
            ignore: "test/ignore/*.styl"
          }
        },
        destDefined: {
          src: "test/collection/*.html",
          // generate files into another dir
          dest: "test/collection/style/",
          // generate less style files
          ext: ".less",
          options: {
            ignore: "test/ignore/*.less"
          }
        },
        module: {
          // match every first subdirectory
          // only the file named after it's parent will be parsed
          // by default it's a .html
          src: "test/module/*/",
          ext: ".less",
          options: {
            ignore: "test/ignore/*.less"
          }
        },
        source: {
          src: "test/module/*/",
          ext: ".styl",
          options: {
            ignore: "test/ignore/*.styl",
            // match mustache file in the module dir
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