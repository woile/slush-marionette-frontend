# Slush Marionette-frontend

> Browserify+Backbone+Marionette frontend enviroment

## Introduction
This slush aims to provide a plug and play MarionetteJS application.

Provides the following:

* Marionette based application example (updated as much as possible, with no deprecated features).
* Includes node-underscorify so you can write your templates in a separate file or in the same index.html.
* BrowserSync to auto-reload the browser.
* Using lodash
* Using Backbone.Radio

What needs to be done:

* Add Support for i18n with an example.
* Write frickin tests.
* Include some kind of fixture or api simulator.

What does not include:

* Two way data binding (try backbone.stickit or backbone.epoxy)
* Validation for your models (try backbone.validation, yeah, you should, it's awesome)
* A way to display form errors (you could write a behaviour for this)
* If you want persisted data using localStorage, take a look at backbone.localStorage.
* If you want to use jade templates, go check `jadeify`.

The idea of this slush is: write your app, execute gulp, (run tests) n see the results.

## Installation

Install `slush-marionette-frontend` globally:

```bash
npm install -g slush-marionette-frontend
```

Or directly from this github repo:


```bash
npm install -g woile/slush-marionette-frontend
```

You'll also need to have `slush` and `gulp` installed globally.

```bash
npm install -g gulp slush
```

If you don't have your node configure try using `sudo` to install `slush` and `slush-marionette-frontend`.

## Project structure

The idea of this marionette application is to have the directory structure sorted by feature,
look at this link for more information (I think it applies for marionette also), http://stackoverflow.com/questions/18542353/angularjs-folder-structure.

Every part of the application should be created inside components, reusable elements should be included inside the commons folder, like behaviors or related stuff.

The layout should be created in the `src/components/layout` folder (duh).
The project structure with the contact-example included will look like this:

```
my-marionette-app
├── CHANGELOG
├── gulp-appfy/
│   ├── config.json
│   ├── index.js
│   └── tasks/
│       ├── browserify.js
│       ├── browser-sync.js
│       ├── build.js
│       ├── clean.js
│       ├── dev.js
│       ├── postcss.js
│       ├── serve.js
│       └── watch-files.js
├── gulpfile.js
├── index.html
├── npm-debug.log
├── package.json
├── README.md
└── src/
    ├── app.js
    ├── components
    │   ├── commons
    │   ├── layout
    │   └── contact-example
    │   	├── index.js
    │   	├── contact.models.js
    │   	├── contact.views.js
    │   	├── contact.html
    │   	└── result.html
    ├── index.css
    ├── index.js
    ├── node_modules
    ├── routes.js
    └── styles
```

## Generators
Available generators:

* [marionette-frontend](#init) (aka [marionette-frontend:init](#init))
* [marionette-frontend:module](#module)

### Init

Creates a new Marionette application, generating all the boilerplate you need to get started.

Create a new folder for your project:

```bash
mkdir my-marionette-app
```

Run the generator from within the new folder:

```bash
cd my-marionette-app

slush marionette-frontend
```
or

```bash
cd my-marionette-app

slush marionette-frontend:init
```

You will be prompted with some question related to you Marionette app.



### Module

Generates a module in `src/components/<module>`

Syntax:

```bash
slush marionette-frontend:module <moduleName>
```

Example:

```bash
slush marionette-frontend:module login
```

You will be prompted to give a name to your new Marionette module.



## Notes

* A component should contain its views, models and the index.js (where you should instanciate your views and modules), then in the `src/routes.js` should be defined the route inside appRoutes and its corresponding function inside the urlHandler.
* To avoid `'Cannot read property 'Deferred' of undefined'` error, is used the backbone version that appears in the package.json, and `Backbone.$` is setted in the `src/app.js`. If you want to read more go to: https://github.com/thejameskyle/marionette-wires/issues/56, this should be fixed in the coming version of Marionette (I hope).

## Getting To Know Slush

Slush is a tool that uses Gulp for project scaffolding.

Slush does not contain anything "out of the box", except the ability to locate installed slush generators and to run them with liftoff.

To find out more about Slush, check out the [documentation](https://github.com/slushjs/slush).

## Contributing

See the [CONTRIBUTING Guidelines](https://github.com/Woile/slush-marionette-frontend/blob/master/CONTRIBUTING.md)

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/Woile/slush-marionette-frontend/issues).

[jjj]:santiwilly@gmail.com

## Thanks

[@LaPlataJS](https://github.com/LaPlataJS)

[@malderete](https://github.com/malderete)

[@dpaez](https://github.com/dpaez)

[@tinchoz49](https://github.com/tinchoz49)

## Based on:
1. [slush-seed-appfy](https://github.com/geut/slush-seed-appfy)
2. [slush-angular-gulp](https://github.com/reflexdemon/slush-angular-gulp)

## License

The MIT License

Copyright (c) 2015, Santiago

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

