var gulp = require( 'gulp' ),
    browserify = require( 'browserify' ),
    watchify = require( 'watchify' ),
    browserSync = require( 'browser-sync' ),
    uglify = require( 'gulp-uglify' ),
    streamify = require( 'gulp-streamify' ),
    source = require( 'vinyl-source-stream' ),
    path = require( 'path' ),
    notify = require( 'gulp-notify' ),
    util = require('gulp-util'),
    collapse = require('bundle-collapser/plugin'),
    sourcemaps = require('gulp-sourcemaps'),
    buffer = require('vinyl-buffer');

/**
 * Gulp task to run browserify over config.entryJs
 * @param  {object} config Global configuration
 * @return {function}        Function task
 */
module.exports = function ( config ) {
    var onBundleError;
    if ( config.notify.onError ) {
        onBundleError = notify.onError( "Browserify Error: <%= error.message %>" );
    } else {
        onBundleError = function ( err ) {
            util.log(util.colors.red('Error'), err.message);
        };
    }

    /**
     * Function to run the Browserify Bundler over pipes
     * @param  {object} bundler Bundler object
     * @return {object} stream  Gulp stream
     */
    function browserifyBundle( bundler ) {
        if ( !(config.debug) ) {
            bundler.plugin(collapse);
        }

        var stream = bundler
            .bundle()
            .on( "error", onBundleError )
            .pipe( source( 'index.js' ) );

        if ( config.debug ) {
            // source map external
            stream = stream.pipe(buffer())
                .pipe(sourcemaps.init({
                    loadMaps: true
                }))
                .pipe(sourcemaps.write('./', {
                    sourceRoot: '/'
                }));
        } else {
            stream = stream.pipe( streamify( uglify() ) );
        }

        stream = stream.pipe( gulp.dest( config.destPath ) );

        if ( config.notify.onUpdated ) {
            return stream.pipe( notify( "Browserify Bundle - Updated" ) );
        }

        return stream;
    }

    return function () {
        var bundler = browserify( {
            entries: path.join(config.sourcePath, config.entryJs),
            debug: config.debug || false
        } );

        if ( config.watchify ) {
            bundler = watchify( bundler );

            bundler.on( 'update', function () {

                browserifyBundle( bundler )
                    .pipe( browserSync.reload( {
                        stream: true
                    } ) );

            } );
        }

        return browserifyBundle( bundler );
    };
};
