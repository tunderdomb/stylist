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

The intended usage is with alongside a watch task,
so you can just write markup, and have stylist generate the sheets for you.

Stylist also keeps existing sheets, so if you define a new class in a html, the selector will be appended.
This way, you can continuously write selectors and have them generated in stylsheets.

## Options

### options.ignore

Type: `String` | `Array`˙

This string, or array of strings should be a set of globbing patterns.
Selectors in matched files will be ignored, and won't be part of the output.

### options.style

Type: `String`

Values: `"css"`, `"less"`, `"styl"`, `"stylus"`, `"sass"`

Default: `"css"`, `"styl"`, `"stylus"`, `"sass"`

Basically the format of the output. You can also select a preprocessor flavor by setting the `ext` expanded options
on the target. Stylist will figure it out from there.
This option is mainly useful if you want to extract selectors as stylus sheets.
Because only stylus has optional braces, the output will omit them too.

### options.classes

Type: `Boolean`

Default: true

Include class selectors in output.

### options.ids

Type: `Boolean`

Default: true

Include id selectors output.

### options.data

Type: `Boolean`

Default: false

Include data attribute selectors in output.
Right now, data attribute values are ignored and won't be part of the output selector.
These two are treated as same:

```html
<input type="text" data-hidden/>
<input type="text" data-hidden="hidden"/>
```

and will output:

```css
[data-hidden]{}
```

## Install

    npm install stylist --save-dev

## Grunt task

    grunt.loadNpmTasks('grunt-stylist');

## Usage


```js

grunt.initConfig({
  stylist: {

    // test/collection/hey.html  ->  test\collection\hey.styl
    // test/collection/ho.html  ->  test\collection\hey.styl
    noDest: {
      src: "test/collection/*.html",
      options: {
        ignore: "test/ignore/*.styl"
      }
    },

    // test/collection/hey.html  ->  test\collection\hey.styl
    // test/collection/ho.html  ->  test\collection\hey.styl
    simpleDest: {
      src: "test/collection/*.html",
      dest: "test/collection/",
      options: {
        ignore: "test/ignore/*.styl"
      }
    },

    // test/collection/hey.html  ->  hey.html
    // test/collection/ho.html  ->  ho.html
    expandNoDest: {
      expand: true,
      cwd: "test/collection/",
      src: "*.html",
      options: {
        ignore: "test/ignore/*.less"
      }
    },

    // test/collection/hey.html  ->  test/collection/style/hey.less
    // test/collection/ho.html  ->  test/collection/style/ho.less
    expandDest: {
      expand: true,
      cwd: "test/collection/",
      src: "*.html",
      dest: "test/collection/style/",
      ext: ".less",
      options: {
        ignore: "test/ignore/*.less"
      }
    },

    // test/module/default/default.html  ->  test/module/default/default.less
    expandExt: {
      expand: true,
      src: "test/module/*/*.html",
      ext: ".less",
      options: {
        ignore: "test/ignore/*.less"
      }
    },

    // test/module/mustache/mustache.mustache  ->  test/module/mustache/mustache.styl
    source: {
      expand: true,
      src: "test/module/*/*.mustache",
      ext: ".styl",
      options: {
        ignore: "test/ignore/*.styl"
      }
    }
  }
})

```

## TEST

Test it with [mocha](http://visionmedia.github.io/mocha/).

    mocha

For the assertions [chai assert](http://chaijs.com/guide/styles/#assert) is used.

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