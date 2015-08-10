'use strict';

var Radio = require('backbone.radio'),
    Marionette = require('backbone.marionette');

module.exports = function(App) {

    /**
     * Controller of the Router.
     * @type {Object}
     */
    var urlHandler = {
        sendContact: function() {
            var contact = require('./components/contact-example');
            Radio.channel('layout').trigger('set:content', contact);
        }
    };

    /**
     * appRoutes contains:
     *      (url):(function inside urlHandler)
     * To make a dynamic url, for example to redirect
     * to an id, the url should be like: '/:id'
     */
    App.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'contact': 'sendContact'
        }
    });

    var router = new App.Router({
        controller: urlHandler
    });

    Radio.channel('root').on('create:layout', function() {
        var layout = require('./components/layout')();
        App.main.show(layout, {forceShow: true});
    });
    // Create layout
    Radio.channel('root').trigger('create:layout');

    return {
        'router': router,
        'urlHandler': urlHandler
    };
};
