var browserSync = require( 'browser-sync' );

/**
 * Gulp task to create a server test
 * @param  {object} config Global configuration
 * @return {function}        Function task
 */
module.exports = function ( config ) {
    return function () {
        browserSync( {
            port: config.browsersync.port,
            notify: config.browsersync.notify,
            server: {
                baseDir: './'
            }
        } );
    };
};