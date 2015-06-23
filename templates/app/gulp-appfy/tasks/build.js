var runSequence = require( 'run-sequence' );

/**
 * Gulp task to build the app for production
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */
module.exports = function ( config ) {
    return function ( cb ) {
        runSequence( 'clean', 'browserify', 'postcss', cb );
    };
}
