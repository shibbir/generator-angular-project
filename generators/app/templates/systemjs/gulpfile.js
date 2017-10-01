const gulp = require('gulp');
const rimraf = require('rimraf');
const Builder = require('systemjs-builder');
const runSequence = require('run-sequence');
const htmlMinifier = require('html-minifier');
const inlineNg2Template = require('gulp-inline-ng2-template');
const plugins = require('gulp-load-plugins')({ lazy: true });
const st = require('st');

const tsProject = plugins.typescript.createProject('tsconfig.json');

const paths = {
    assets: [
        'src/**/*.html',
        'src/**/*.js',
        'src/**/*.css',
        'src/**/*.ico'
    ],
    vendors: [<% if(jquery) { %>
        'node_modules/jquery/dist/jquery.js',<% } %><% if(bootstrap) { %>
        'node_modules/bootstrap/dist/js/bootstrap.js',<% } %><% if(foundation) { %>
        'node_modules/foundation-sites/dist/js/foundation.js',<% } %>
        'node_modules/core-js/client/shim.js',
        'node_modules/zone.js/dist/zone.js'
    ],
    systemjsConfig: 'src/systemjs.config.js',
    css: [<% if(bootstrap) { %>
        'node_modules/bootstrap/dist/css/bootstrap.css',<% } %><% if(foundation) { %>
        'node_modules/foundation-sites/dist/css/foundation.css',<% } %>
        'src/styles/main.css'
    ],
    prod: 'dist/prod/',
    dev: 'dist/dev/',
    tmp: 'dist/tmp/'
};

gulp.task('env:production', function() {
    process.env.NODE_ENV = 'production';
});

gulp.task('env:development', function() {
    process.env.NODE_ENV = 'development';
});

gulp.task('inject:index', function () {
    let target = gulp.src('src/index.html');

    let sources = gulp.src([
        'dist/prod/vendors.min.js',
        'dist/prod/app.min.js',
        'dist/prod/styles.min.css'
    ], { read: false });

    return target.pipe(plugins.inject(sources, { ignorePath: paths.prod, addRootSlash: false })).pipe(gulp.dest(paths.prod));
});

gulp.task('tsc', function() {
    const IsProduction = process.env.NODE_ENV === 'production';

    return tsProject.src()
        .pipe(plugins.if(!IsProduction, plugins.sourcemaps.init()))
        .pipe(inlineNg2Template({ base: 'src', useRelativePaths: true, indent: 0, removeLineBreaks: true, templateProcessor: function(path, ext, file, cb) {
            try {
                let minifiedFile = htmlMinifier.minify(file, {
                    collapseWhitespace: true,
                    caseSensitive: true,
                    removeComments: true,
                    removeRedundantAttributes: true
                });
                cb(null, minifiedFile);
            }
            catch (err) {
                cb(err);
            }
        }}))
        .pipe(tsProject())
        .pipe(plugins.if(!IsProduction, plugins.sourcemaps.write('/')))
        .pipe(gulp.dest(IsProduction ? paths.tmp : paths.dev))
        .pipe(plugins.if(!IsProduction, plugins.connect.reload()));
});

gulp.task('bundle:css', function() {
    return gulp.src(paths.css)
        .pipe(plugins.concat('styles.min.css'))
        .pipe(plugins.cleanCss({ level: 2 }))
        .pipe(gulp.dest(paths.prod));
});

gulp.task('bundle:vendors', function() {
    return gulp.src(paths.vendors)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('vendors.min.js'))
        .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write('/'))
        .pipe(gulp.dest(paths.prod));
});

gulp.task('bundle:app', function() {
    let builder = new Builder(paths.tmp, paths.systemjsConfig);

    return builder.buildStatic('main.js', paths.prod + 'app.min.js', { minify: true, sourceMaps: true });
});

gulp.task('copy:assets', function() {
    return gulp.src(paths.assets).pipe(gulp.dest(paths.dev)).pipe(plugins.connect.reload());;
});

gulp.task('copy:index', function() {
    return gulp.src('src/index.html').pipe(gulp.dest(paths.prod));
});

gulp.task('clean:prod', function(done) {
    rimraf(paths.prod, done);
});

gulp.task('clean:dev', function(done) {
    rimraf(paths.dev, done);
});

gulp.task('clean:tmp', function(done) {
    rimraf(paths.tmp, done);
});

gulp.task('build:prod', function(done) {
    runSequence('env:production', 'clean:prod', 'tsc', 'bundle:css', 'bundle:vendors', 'bundle:app', 'inject:index', 'clean:tmp', done);
});

gulp.task('serve:prod', function(done) {
    runSequence('build:prod', ['connect', 'watch'], done);
});

gulp.task('build:dev', function(done) {
    runSequence('env:development', 'clean:dev', 'tsc', 'copy:assets', done);
});

gulp.task('serve:dev', function(done) {
    runSequence('build:dev', ['connect', 'watch'], done);
});

gulp.task('connect', function() {
    const IsProduction = process.env.NODE_ENV === 'production';

    plugins.connect.server({
        root: IsProduction ? paths.prod : paths.dev,
        port: 3030,
        livereload: true,
        fallback: (IsProduction ? paths.prod : paths.dev) + '/index.html',
        middleware: (connect, opt) => {
            return [
                st({ path: 'node_modules', url: '/node_modules' })
            ];
        }
    });
});

gulp.task("watch", function () {
    gulp.watch(['src/**/*.ts'], ['tsc']);
    gulp.watch(['src/**/*.html', 'src/**/*.css',  'src/**/*.js'], ['copy:assets']);
});
