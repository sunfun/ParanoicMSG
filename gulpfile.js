var gulp = require('gulp');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');

// Основные
gulp.task('css', function () {
  gulp.src('./assets/css/*.css')
    .pipe(gulp.dest('./public/css/'))
    .pipe(connect.reload());
});


gulp.task('html',function(){
    gulp.src('./assets/*.html')
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload());
});

gulp.task('fonts',function(){
    gulp.src('./assets/font/**/*')
    .pipe(gulp.dest('./public/font/'))
    .pipe(connect.reload());
});

gulp.task('js',function(){
    gulp.src('./assets/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'))
    .pipe(connect.reload());
});

// Connect
gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

// Watch
gulp.task('watch',function(){
    gulp.watch("./assets/css/*.css", ["css"]);
    gulp.watch("./assets/*.html", ["html"]);
    gulp.watch("./assets/js/**/*.js", ["js"]);
});

// Default
gulp.task('default', ["html", "css", "js", "connect", "watch"]);