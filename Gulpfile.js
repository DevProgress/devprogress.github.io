const child = require('child_process');
const fs = require('fs');
const gulp = require('gulp');
const sass = require('gulp-sass');
const bowerSrc = require('gulp-bower-src');
const livereload = require('gulp-livereload');

gulp.task('server', () => {
  const server = child.spawn('node', ['server.js']);
  const log = fs.createWriteStream('server.log', {
    flags: 'a',
  });
  server.stdout.pipe(log);
  server.stderr.pipe(log);
});

gulp.task('styles', () => {
  gulp.src('assets/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('assets/css/'))
    .pipe(livereload());
});

gulp.task('bower', () => {
  bowerSrc()
    .pipe(gulp.dest('assets/vendor'))
    .pipe(livereload());
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('assets/sass/*.scss', ['styles']);
  gulp.watch('assets/vendor', ['bower']);
  gulp.watch('index.html', () => {
    gulp.src('index.html')
      .pipe(livereload());
  });
});

gulp.task('default', ['server', 'watch']);
