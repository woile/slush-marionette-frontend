/**
 * Gulp module.
 * @module gulp
 */
var gulp = require( 'gulp' ),
    config = require( './config.json' ),
    path = require( 'path' ),
    util = require( 'util' ),
    runSequence = require( 'run-sequence' );

module.exports = function ( basePath, userConfig ) {
    if ( userConfig ) {
        config = util._extend(config, userConfig);
    }
    /**
     * Autosettings
     */
    config.basePath = basePath;
    config.sourcePath = path.join( config.basePath, config.sourcePath );
    config.destPath = path.join( config.basePath, config.destPath );

    /**
     * Gulp task definitions
     */
    gulp.task( 'clean', require( './tasks/clean.js' )( config ) );
    gulp.task( 'browserify', require( './tasks/browserify.js' )( config ) );
    //gulp.task( 'rework-css', require( './tasks/rework-css.js' )( config ) );
    gulp.task( 'postcss', require( './tasks/postcss.js' )( config ) );
    gulp.task( 'browser-sync', require('./tasks/browser-sync.js')( config ) );
    gulp.task( 'watch-files', require('./tasks/watch-files.js')( config ) );

    gulp.task( 'dev', require('./tasks/dev.js')( config ) );
    gulp.task( 'build', require('./tasks/build.js')( config ) );
    gulp.task( 'serve', require('./tasks/serve.js')( config ) );

    gulp.task( 'default', function ( cb ) {
        runSequence( 'clean', 'dev', 'serve', cb );
    } );
}
