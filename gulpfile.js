'use strict';

const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  minifyCss = require('gulp-clean-css'),
	  minifyJs = require('gulp-uglify'),
	  scssPath = "./src/scss/**/*.scss",
	  cssPath = "./",
	  jsPath = "./src/js/**/*.js",
	  minJsPath = "./",

	  build = {

		  default: function(){
			  build.sass();
			  build.js();
		  },

		  sass: function(){
			  return gulp.src(scssPath)
			  .pipe(sass().on('error', sass.logError))
			  .pipe(minifyCss())
			  .pipe(gulp.dest(cssPath));
		  },

		  js: function(){
			  return gulp.src(jsPath, {base: './src/js'})
			  .pipe(minifyJs())
			  .pipe(gulp.dest(minJsPath));
		  }

	  };

gulp.task('default', build.default);
gulp.task('sass', build.sass);
gulp.task('js', build.js);
gulp.task('watch', function(){
	gulp.watch(scssPath, ['sass']);
	gulp.watch(jsPath, ['js']);
});

module.exports = build;
