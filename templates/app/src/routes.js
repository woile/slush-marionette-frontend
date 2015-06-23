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
            '/': 'home'
        }
    });

    /**
     * Controller of the Router.
     * @type {Object}
     */
    var urlHandler = {
        home: function () {
            // var MyView = require('./components/my-view');
            // App.main.show(MyView);
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
