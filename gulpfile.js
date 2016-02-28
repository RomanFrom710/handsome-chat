var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cssNano = require('gulp-cssnano');
var nodemon = require('gulp-nodemon');
var autoprefixer = require('gulp-autoprefixer');
var templateCache = require('gulp-angular-templatecache');
var plumber = require('gulp-plumber');
var angularSort = require('gulp-angular-filesort');

var environments = require('gulp-environments');
var production = environments.production;

var compiledPath = 'public/compiled';

var vendors = [
    'lodash/lodash.js',
    'angular/angular.js',
    'angular-ui-router/release/angular-ui-router.js',
    'restangular/dist/restangular.js',
    'angular-animate/angular-animate.js',
    'angular-bootstrap/ui-bootstrap.js',
    'ngstorage/ngStorage.js'
];
vendors = vendors.map(function (path) { return 'bower_components/' + path; });

var scripts = [
    'src/client/app/**/!(app|module)*.js',
    'src/client/app/app.js'
];
var modules = [
    'src/client/app/**/module.js'
];


gulp.task('vendor-scripts', function() {
    return gulp.src(vendors)
        .pipe(concat('vendor.js'))
        .pipe(production(uglify()))
        .pipe(gulp.dest(compiledPath));
});


gulp.task('modules', function() {
    return gulp.src(modules)
        .pipe(angularSort())
        .pipe(concat('modules.js'))
        .pipe(production(uglify()))
        .pipe(gulp.dest(compiledPath));
});


gulp.task('scripts', function() {
    return gulp.src(scripts)
        .pipe(concat('app.js'))
        .pipe(production(uglify()))
        .pipe(gulp.dest(compiledPath));
});


gulp.task('less', function() {
    return gulp.src('src/client/styles/main.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(concat('styles.css'))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(production(cssNano()))
        .pipe(gulp.dest(compiledPath));
});


gulp.task('templates', function() {
    return gulp.src('src/**/*.html')
       .pipe(templateCache('templates.js', { module: 'templates', standalone: true }))
       .pipe(gulp.dest(compiledPath));
});


gulp.task('watch', function () {
    gulp.watch('src/client/styles/**/*.less', ['less']);
    gulp.watch('src/client/app/**/*.js', ['scripts', 'modules']);
    gulp.watch('src/client/**/*.html', ['templates']);
});


gulp.task('start', function () {
    var env = production() ? 'production' : 'development';
    nodemon({
        script: './src/server/start.js',
        env: { 'NODE_ENV': env }
    });
});


gulp.task('default', ['vendor-scripts', 'scripts', 'modules', 'templates', 'less', 'watch', 'start']);
