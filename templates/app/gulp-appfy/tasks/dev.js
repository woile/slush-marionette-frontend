var runSequence = require( 'run-sequence' );

/**
 * Gulp task to build the app for in mode developer
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */
module.exports = function ( config ) {
    return function ( cb ) {
        config.debug = true;
        config.watchify = true;
        runSequence( 'browserify', 'postcss', cb );
    };
};
