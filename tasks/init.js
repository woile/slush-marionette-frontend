'use strict';
(function() {
    /**
     * App Task
     * This is the main task that is invoked for the processing of the slushfile.js
     */
    var install = require( 'gulp-install' ),
        conflict = require( 'gulp-conflict' ),
        template = require( 'gulp-template' ),
        rename = require( 'gulp-rename' ),
        gulpFilter = require( 'gulp-filter' ),
        slugify = require('underscore.string/slugify'),
        _ = require( 'underscore' ),
        path = require('path'),
        inquirer = require( 'inquirer' );

    module.exports = function(gulp) {

        function format( string ) {
            var username = string.toLowerCase();
            return username.replace( /\s/g, '' );
        }
        var examples = ['contact-example'];

        var defaults = (function() {
            var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
                workingDirName = process.cwd().split( '/' ).pop().split( '\\' ).pop(),
                osUserName = homeDir && homeDir.split( '/' ).pop() || 'root',
                configFile = homeDir + '/.gitconfig',
                user = {};
            if ( require( 'fs' ).existsSync( configFile ) ) {
                user = require( 'iniparser' ).parseSync( configFile ).user;
            }
            return {
                appName: workingDirName,
                userName: format( user.name ) || osUserName,
                authorName: user.name || '',
                authorEmail: user.email || ''
            };
        }());

        gulp.task('init', function(done) {
            var prompts = [ {
                name: 'appName',
                message: 'What is the name of your project?',
                default: defaults.appName
            }, {
                name: 'appDescription',
                message: 'What is the description?'
            }, {
                name: 'appVersion',
                message: 'What is the version of your project?',
                default: '0.1.0'
            }, {
                name: 'authorName',
                message: 'What is the author name?',
                default: defaults.authorName
            }, {
                name: 'authorEmail',
                message: 'What is the author email?',
                default: defaults.authorEmail
            },
            {
                type: 'checkbox',
                name: 'example',
                message: 'Please select the examples that needs to be included: (Say yes to replace)',
                choices: [{
                        name: 'A Simple Contact demo (RECOMMENDED).',
                        value: 'contact-example',
                        checked: true
                    }
                ]
            }, {
                type: 'confirm',
                name: 'moveon',
                message: 'Continue?'
            }];

            // Ask
            return inquirer.prompt( prompts, function( answers ) {
                if ( !answers.moveon ) {
                    return done();
                }
                answers.appNameSlug = slugify( answers.appName );
                var d = new Date();
                answers.year = d.getFullYear();
                answers.date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
                var templatesToChange = gulpFilter( ['*', '!gulp'] );
                var files = [path.join(__dirname, '../templates/app/**')];
                // __dirname + '/../templates/app/**'];

                var include = _.intersection(examples, answers.example);
                _.each(include, function(choice) {
                    // files.push('!' + __dirname + '/../templates/app/src/components/' + choice + '/**');
                    // files.push('!' + __dirname + '/../templates/app/src/components/' + choice);
                    files.push(path.join(__dirname, '../templates', choice, '**'));
                        // __dirname + '/../templates/'+ choice + '/**');

                        // __dirname + '/../templates/' + choice
                    files.push(path.join(__dirname, '../templates', choice));
                });

                gulp.src( files )
                    .pipe( templatesToChange )
                    .pipe( template( answers ) )
                    .pipe( templatesToChange.restore() )
                    .pipe( rename( function( file ) {
                        if ( file.basename[ 0 ] === '_' ) {
                            file.basename = '.' + file.basename.slice( 1 );
                        }
                        _.each(include, function(choice) {
                            /**
                             * TODO Instead of replacing, this should make a diff
                             * and merge the files, but as I just have single file
                             * I won't do it.
                             */
                            if ( file.basename === choice) {
                                file.basename = '.';
                            }
                        });

                    } ) )
                    .pipe( conflict( './' ) )
                    .pipe( gulp.dest( './' ) )
                    .pipe( install() ).on( 'end', function() {
                        done();
                    } );
            } );
        } );
    };
}());
