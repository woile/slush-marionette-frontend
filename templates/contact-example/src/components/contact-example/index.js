'use strict';

var Message = require('./contact.models'),
    ContactView = require('./contact.views');

console.log(Message);
var message = new Message({});
var messageView = new ContactView({
        model: message
    });

module.exports = messageView;
