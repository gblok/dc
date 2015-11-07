var gulp = require('gulp');
var path = require('path');

var debug = require('gulp-debug');
var gutil = require('gulp-util');

var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var less = require('gulp-less');
var bower = require('main-bower-files');

var pleeease = require('gulp-pleeease');

var riot = require('gulp-riot');
var jade = require('gulp-jade');

var dir = {

    public: 'public',
    assets: 'public/assets',
    js: 'src/js',
    less: 'src/less/all.less',
    jade: 'src/html/*.jade',
    riot: 'src/riot/*.jade',
    scripts: [
        'src/js/lib.js',
        'src/js/functions.js',
        'src/js/api.js',
        'src/js/riot-tags.js',
        'src/js/riot-mount.js'
    ]
};


//['IE 8', 'last 3 versions', 'Android 2.3']

gulp.task('less', function () {
    gulp
        .src(dir.less)
        .pipe(debug())
        .pipe(less({paths: [path.join(__dirname, 'less', 'includes')]}))
        .pipe(pleeease({browsers: ['last 1 versions', 'Android 2.3'], cascade: false}))
        .pipe(gulp.dest(dir.assets))
        .on('error', gutil.log);
});

gulp.task('js', function () {
    gulp
        .src(dir.scripts)
        .pipe(debug())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dir.assets))
        .on('error', gutil.log);
});


gulp.task('jade', function () {
    gulp
        .src(dir.jade)
        .pipe(debug())
        .pipe(jade())
        .pipe(gulp.dest(dir.public))
        .on('error', gutil.log);
});


gulp.task('riot', function () {
    gulp
        .src(dir.riot)
        .pipe(debug())
        .pipe(riot({compact: true, template: 'jade'}))
        .pipe(concat('riot-tags.js'))
        .pipe(gulp.dest(dir.js))
        .on('error', gutil.log);
});


gulp.task('bower', function () {
    gulp
        .src(bower({debugging: true}))
        .pipe(concat('lib.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dir.js))
        .on('error', gutil.log);
});

gulp.task('riot-js', ['riot', 'js']);

gulp.task('default', ['less', 'js']);

gulp.task('build', ['bower', 'jade', 'riot-js', 'default']);
