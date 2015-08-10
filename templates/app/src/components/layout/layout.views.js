'use strict';

var $ = require('jquery'),
    Radio = require('backbone.radio'),
    _ = require('underscore'),
    Mn = require('backbone.marionette');


var AppLayout = Mn.LayoutView.extend({
    template: require('./layout.html'),
    regions: {
        header: '#header-region',
        content: '#content-region',
        footer: '#footer-region',
        nav: '#nav-region',
        modal: '#modal-region'
    },
    initialize: function() {
        // Create the event on which the layout will be filled
        var self = this;

        Radio.channel('layout').on('set:header', function(HeaderView) {
            self.header.show(HeaderView);
        });
        Radio.channel('layout').on('set:footer', function(FooterView) {
            self.header.show(FooterView);
        });

        Radio.channel('layout').on('set:content', function(ContentView) {
            self.content.show(ContentView);
        });
    },
    onBeforeDestroy: function() {
        Radio.reset('layout');
    }
});

module.exports = {
    Layout: AppLayout
};
