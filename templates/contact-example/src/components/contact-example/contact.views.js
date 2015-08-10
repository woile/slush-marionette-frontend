'use strict';

var $ = require('jquery'),
    Marionette = require('backbone.marionette');

var ResultView = Marionette.ItemView.extend({
    el: '#result',
    template: require('./result.html')
});

var ContactView = Marionette.ItemView.extend({
    initialize: function() {
        console.log(this);
    },
    template: require('./contact.html'),
    events: {
        'change input': 'handeFieldChanged',
        'change textarea': 'handeFieldChanged',
        'click #submit': 'onSubmit'
    },
    handeFieldChanged: function(evt) {
        /**
         * Handles the event when an input changes and
         * populates the model.
         */
        var changed = evt.currentTarget,
            value = $(evt.currentTarget).val(),
            obj = {},
            attrId = changed.id;
        obj[attrId] = value;

        console.log('Changed', obj);
        this.model.set(obj);
    },
    onSubmit: function(evt) {
        evt.preventDefault();
        var result = new ResultView({
            model: this.model
        });
        result.render();
    }
});

module.exports = ContactView;

