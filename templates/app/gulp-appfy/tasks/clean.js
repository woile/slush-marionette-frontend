var del = require( 'del' );

/**
 * Task clean
 * @param  {function} cb Callback
 * @return {function}      Function task
 */
module.exports = function ( config ) {
    return function ( cb ) {
        del( config.destPath, cb );
    };
};
