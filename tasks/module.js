(function() {
    /**
     * App Task
     * This is the main task that is invoked for the processing of the slushfile.js
     */
    'use strict';
    var install = require( 'gulp-install' ),
        conflict = require( 'gulp-conflict' ),
        template = require( 'gulp-template' ),
        rename = require( 'gulp-rename' ),
        slugify = require("underscore.string/slugify"),
        _ = require( 'underscore' ),
        inquirer = require( 'inquirer' );

    module.exports = function(gulp) {

        gulp.task( 'module', function ( done ) {
            var prompts = [ {
                name: 'moduleName',
                message: 'What is the name of the module?',
                default: 'no name'
            }, {
                type: 'confirm',
                name: 'moveon',
                message: 'Continue?'
            }];

            //Ask
            return inquirer.prompt( prompts, function ( answers ) {
                if ( !answers.moveon ) {
                    return done();
                }

                answers.moduleNameSlug = slugify( answers.moduleName );
                var d = new Date();
                answers.year = d.getFullYear();
                answers.date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
                var files = [__dirname + '/../templates/module/**/**'];

                gulp.src( files )
                    .pipe( template( answers ) )
                    .pipe( rename( function ( file ) {
                        if ( file.basename[ 0 ] === '_' ) {
                            file.basename = '.' + file.basename.slice( 1 );
                        }
                        var replaceDefault = file.basename.split('.');
                        if ( replaceDefault[ 0 ] === 'default' ) {
                            file.basename = answers.moduleNameSlug + '.' + replaceDefault[ 1 ];
                        }
                        if (file.basename === 'template') {
                            file.basename = answers.moduleNameSlug;
                        }
                        if ( file.dirname === 'template') {
                            file.dirname = answers.moduleNameSlug;
                        }

                    } ) )
                    .pipe( conflict( './' ) )
                    .pipe( gulp.dest( './src/components' ) )
                    .pipe( install() ).on( 'end', function () {
                        done();
                    } );
            } );
        } );
    };
})();