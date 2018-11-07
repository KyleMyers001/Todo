const gulp = require('gulp');
const run = require('gulp-run');

gulp.task('start-angular-app', () => {
  return run('ng serve').exec();
});

gulp.task('start-web-api', () => {
  return run('nodemon src/webapi/index.js').exec();
});

gulp.task('serve', ['start-angular-app'], () => {
  gulp.start('start-web-api');
  run('nodemon src/webapi/index.js').exec()
  // gulp.start('start-angular-app');
});

gulp.task('default', ['serve']);
