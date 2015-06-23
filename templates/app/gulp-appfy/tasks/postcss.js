var gulp = require('gulp'),
    path = require('path'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps');

// PostCSS and plugins
var postcss = require('gulp-postcss'),
    postcssImport = require('postcss-import'),
    postcssUrl = require('postcss-url'),
    nano = require('cssnano');


/**
 * Gulp task to process the css files usign PostCSS and cssnext
 * @param  {object} config Global configuration
 * @return {function}       Function task
 */
module.exports = function (config) {
    var plumberOptions = {};
    if (config.notify.onError) {
        plumberOptions.errorHandler = notify.onError("PostCSS Error: <%= error.message %>");
    }

    //TODO: check the sourcemap problems
    return function () {
        var processors = [
            postcssImport(),
            postcssUrl({
                url: config.debug ? 'rebase' : 'copy'
            }),
            nano()
        ];

        var stream = gulp.src(path.join(config.sourcePath, config.entryCss))
            .pipe(plumber(plumberOptions))
            .pipe( postcss(processors, {
                map: config.debug || false,
                to: path.join(config.destPath, config.entryCss)
            }) );

        if ( config.debug ) {
            stream = stream
                .pipe(sourcemaps.init({
                    loadMaps: true
                }))
                .pipe(sourcemaps.write('./', {
                    sourceRoot: '/' + path.basename(config.sourcePath)
                }));
        }

        stream = stream.pipe(gulp.dest(config.destPath));

        if (config.notify.onUpdated) {
            return stream.pipe(notify("PostCSS Bundle - Updated"));
        }

        return stream;
    };
};
