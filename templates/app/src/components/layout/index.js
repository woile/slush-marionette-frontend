'use strict';

/**
 * This exports a view, used to create the layout.
 *
 * @returns {obj} [instance of the layout]
 */
var LayoutView = require('./layout.views');

module.exports = function() {

  var layoutView = new LayoutView.Layout({});
  return layoutView;
};

