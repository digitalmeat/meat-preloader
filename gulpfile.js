/*
|--------------------------------------------------------------------------
| Gulpfile
|--------------------------------------------------------------------------
|
| buildfile for jquery.gmaps plugin
|
*/

var gulp              = require('gulp');
var concat            = require('gulp-concat');
var uglify            = require('gulp-uglify');
var rename            = require("gulp-rename");
var addsrc            = require('gulp-add-src');
var removeEmptyLines  = require('gulp-remove-empty-lines');
var beautify          = require('gulp-beautify');
var sass              = require('gulp-sass');
var strip             = require('gulp-strip-comments');
var cssmin            = require('gulp-cssmin');
var livereload        = require('gulp-livereload');

gulp.task('build:js', function() {
  gulp.src(['./src/main.js'])
    // default
    .pipe(concat('meat-preloader.js'))
    .pipe(beautify({indent_size: 2}))
    .pipe(strip( {ignore: /\/\*\*\s*\n([^\*]*(\*[^\/])?)*\*\//g} ))
    .pipe(removeEmptyLines({ removeComments: true }))
    .pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./src/**/*.js', ['build:js']);
});
