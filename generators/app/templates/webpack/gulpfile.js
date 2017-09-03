const gulp = require('gulp');
const rimraf = require('rimraf');
const plugins = require('gulp-load-plugins')({ lazy: true });
const runSequence = require('run-sequence');

let paths = {
    dist: 'dist'
};

gulp.task('clean:dist', function(done) {
    rimraf(paths.dist, done);
});

gulp.task('dev-server', plugins.shell.task('webpack-dev-server --inline --progress --port 3030 --open'));

gulp.task('build', plugins.shell.task([
    'rimraf dist',
    'webpack --config config/webpack.prod.js --progress --profile --bail'
]));

gulp.task('serve', function(done) {
    runSequence('clean:dist', 'dev-server', done);
});
