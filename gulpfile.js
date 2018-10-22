const gulp = require('gulp');
const run = require('gulp-run');

gulp.task('start-angular-app', () => {
  return run('ng serve').exec();
});

gulp.task('start-web-api', () => {
  return run('node src/webapi/index.js').exec();
});

gulp.task('serve', ['start-angular-app', 'start-web-api'], () => {
  gulp.start(['start-angular-app', 'start-web-api']);
});

gulp.task('default', ['start-angular-app']);
