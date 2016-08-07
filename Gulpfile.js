var gulp        = require('gulp');
var sass        = require('gulp-sass');
var bowerSrc    = require('gulp-bower-src');
var uglify      = require('gulp-uglify');

gulp.task('styles', function() {
  gulp.src('assets/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/css/'));
});


gulp.task('default', function() {
  bowerSrc()
        .pipe(gulp.dest('assets/vendor'));
  gulp.watch('assets/sass/*.scss', ['styles']);
});
