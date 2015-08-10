'use strict';
var Marionette = require('backbone.marionette');

module.exports = function(App) {

    /**
     * Controller of the Router.
     * @type {Object}
     */
    var urlHandler = {
        home: function() {
            // Write home here.
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
            '/': 'home'
        }
    });

    var router = new App.Router({
        controller: urlHandler
    });

    return {
        'router': router,
        'urlHandler': urlHandler
    };
};
