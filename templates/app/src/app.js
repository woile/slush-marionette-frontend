'use strict';

var Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;

var Marionette = require('backbone.marionette');

var App = new Marionette.Application();

App.addRegions({
    'main': '#main'
});

require('./routes')(App);

App.on('start', function() {
    if (Backbone.history) {
        Backbone.history.start({
            pushState: true,
            root: '/'
        });
    }
});

module.exports = App;
