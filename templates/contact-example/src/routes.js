'use strict';
var Marionette = require('backbone.marionette');

module.exports = function (App) {

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

    /**
     * Controller of the Router.
     * @type {Object}
     */
    var urlHandler = {
        sendContact: function () {
            var Contact = require('./components/contact-example');
            App.main.show(Contact);
        }
    };

    var router = new App.Router({
        controller: urlHandler
    });

    return {
        'router': router,
        'urlHandler': urlHandler
    };
};
