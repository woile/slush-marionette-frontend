'use strict';

var Backbone = require('backbone'),
    $ = require('jquery');
Backbone.$ = $;

var Marionette = require('backbone.marionette');

var App = new Marionette.Application(),
	routes = require('./routes')(App);

App.addRegions({
    'main': '#main'
});

App.on('start', function (){
    if(Backbone.history){
		Backbone.history.start({
			pushState: true,
			root: '/'
		});

		/**
		 * This bind on click, plus the pushState true in the backbone history,
		 * are used to remove the # (hash) from the url.
		 */
		$(document).on('click', 'a:not([data-bypass])', function (evt) {
		    var href = $(this).attr('href');
		    var protocol = this.protocol + '//';

		    if (href.slice(protocol.length) !== protocol) {
		        evt.preventDefault();
		        routes.router.navigate(href, true);
		    }
		});
	}
});
module.exports = App;