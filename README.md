Stylist.js
=========

Extract selectors from html into a stylesheet, or append them to one, keeping existing rules.
Optionally ignore rules declared in elsewhere.

## install

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