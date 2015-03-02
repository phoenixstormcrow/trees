/* gulpfile for trees */

/* gulpfile tutorial at http://www.smashingmagazine.com/2014/06/11/building-with-gulp/
*/

var fs = require('fs-extra'),
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),
    browserify = require('browserify');

gulp.task('lint', function () {
    return gulp.src('./*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('browserify', ['lint'], function () {
    return browserify('./main.js')
        .bundle()
        .pipe(source('main-bundle.js'))
        .pipe(gulp.dest('./build'));

});

gulp.task('watch', [], function() {
    var bundler = watchify(browserify('./main.js', { debug: true }));

    bundler.on('update', rebundle);

    function rebundle() {
        return bundler.bundle()
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('main-bundle.js'))
            .pipe(gulp.dest('./build'));
    }

    return rebundle();

});

gulp.task('gist', ['lint', 'browserify'], function () {
    fs.copy('build/main-bundle.js', 'gist/trees-demo-bundle.js', function (err) {
        if (err) return console.error(err);
    });
    fs.copy('build/trees.html', 'gist/index.html', function (err) {
        if (err) return console.error(err);
    });
});

gulp.task('build', ['lint', 'browserify']);
