'use strict';


var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
	scripts: ['assets/js/**.js'],
	sass: ['./assets/sass/main.scss'],
	html: ['index.html'], 
	images: ['assets/img/**']
};


gulp.task('clean', function() {
	gulp.src('build/');
});

gulp.task('scripts', function() {
	gulp.src(paths.scripts)
	.pipe(jshint())
 	.pipe(jshint.reporter('default'))
 	.pipe(uglify())
 	.pipe(concat('main.min.js'))
	.pipe(gulp.dest('build/scripts/'));
});

gulp.task('images', function() {
 	gulp.src(paths.images)
 	.pipe(imagemin())
 	.pipe(gulp.dest('build/images/'));
});

gulp.task('sass', function () {
  	gulp.src(paths.sass)
 	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('build/css/'));
});

gulp.task('serve', function() {
   	browserSync.init({
   		server: true,
		port: 9000
   	});
});

gulp.task('watch', function(){
	gulp.watch(paths.scripts, ['scripts']).on('change', browserSync.reload);
	gulp.watch('assets/sass/**/*.scss', ['sass']).on('change', browserSync.reload);
	gulp.watch(paths.images, ['images']).on('change', browserSync.reload);
   gulp.watch("index.html").on('change', browserSync.reload);
});

gulp.task('default', ['clean', 'scripts', 'sass', 'images', 'serve', 'watch']);
