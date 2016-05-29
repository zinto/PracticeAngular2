var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    tscConfig = require('./tsconfig.json');

var appSrc = 'src/app/',
    assetsSrc = 'src/app/assets/',
    componentsSrc = 'src/app/components/';

gulp.task('html', function () {
    gulp.src(componentsSrc + '**/*.html');
});

gulp.task('css', function () {
    gulp.src(assetsSrc + 'css/*.css');
});

gulp.task('copylibs', function () {
    return gulp
        .src([
            'node_modules/es6-shim/es6-shim.min.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/angular2/bundles/angular2.dev.js'
        ])
        .pipe(gulp.dest(appSrc + 'js/lib/angular2'));
});

gulp.task('typescript', function () {
    return gulp
        .src(appSrc + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(appSrc + 'js/'));
});

gulp.task('watch', function () {
    gulp.watch(appSrc + '**/*.ts', ['typescript']);
    gulp.watch(assetsSrc + 'css/*.css', ['css']);
    gulp.watch(componentsSrc + '**/*.html', ['html']);
});

gulp.task('webserver', function () {
    gulp.src(appSrc)
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['copylibs', 'typescript', 'watch', 'webserver']);
