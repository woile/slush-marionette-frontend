'use strict';
/*
 * slush-marionette-frontend
 * https://github.com/Woile/slush-marionette-frontend
 *
 * Copyright (c) 2015, Santiago
 * Licensed under the MIT license.
 */

var gulp = require('gulp');
(function() {
    var includeAll = require('include-all');
    /**
     * Loads task modules from a relative path.
     */
    function loadTasks(relPath) {
        return includeAll({
            dirname: require('path').resolve(__dirname, relPath),
            filter: /(.+)\.js$/
        }) || {};
    }
    // *
    //  * Invokes the function from a Gulp configuration module with
    //  * a single argument - the `gulp` object.

    function addTasks(tasks) {
        for (var taskName in tasks) {
            if (tasks.hasOwnProperty(taskName)) {
                tasks[taskName](gulp);
            }
        }
    }
    /**
     * Add all Gulp tasks to the gulpfile.
     * Tasks are in `tasks/`
     */
    addTasks(loadTasks('tasks/'));
})();

// require('gulp-load-tasks')(__dirname + '/tasks');
gulp.task('default', ['init']);