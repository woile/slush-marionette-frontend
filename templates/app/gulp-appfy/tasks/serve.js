var runSequence = require( 'run-sequence' );

/**
 * Gulp task to execute a server test with the app builded in mode 'env'
 * @param  {object} config Global configuration
 * @return {function}      Function task
 */
module.exports = function ( config ) {
    return function ( cb ) {
        config.watchify = true;
        runSequence( 'browser-sync', 'watch-files', cb );
    };
};
