
var $ = require('jquery'),
    Backbone = require('backbone');

Backbone.$ = $;

var Marionette = require('backbone.marionette');
require('./shims/radio.shim.js');
var App = new Marionette.Application();

App.addRegions({
    main: '#main'
});

require('./routes')(App);

App.on('start', function() {
    if (Backbone.history) {
        Backbone.history.start({});
    }
});

module.exports = App;
