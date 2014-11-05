/*global require*/

var gulp = require('gulp');
var jshint = require('gulp-jshint');
//var recess = require('gulp-recess');
//var exec = require('gulp-exec');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var flatten = require('gulp-flatten');

var path = require('path');

var packageName = require('./package').name;

var dest = './build';
var paths = {
  src: {
    js: 'js/',
    less: 'less/index.less',
    images: 'img/**',
    fonts: '**/*.{ttf,woff,eof,svg}'
  },
  dest: {
    js: path.join(dest, 'js'),
    css: path.join(dest, 'css'),
    images: path.join(dest, 'img'),
    fonts: path.join(dest, 'fonts'),
  },

  lintJs: ['**/*.js', '!node_modules/**/*.js', '!bower_components/**/*.js'],
  lintLess: ['**/*.less', '!node_modules/**/*.less', '!bower_components/**/*.less'],
};

gulp.task('lint-js', function () {
  gulp.src(paths.lintJs)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
gulp.task('lint-less', function () {
//  gulp.src(paths.lintLess)
//    .pipe(recess({
//      strictPropertyOrder: false, // Bootstrap ignores this
//      noOverqualifying: false, // Bootstrap ignores this
//      noUniversalSelectors: false, // Bootstrap ignores this
//      zeroUnits: false // Bootstrap ignores this
//    }));
});
gulp.task('lint', ['lint-js', 'lint-less']);

gulp.task('test', ['lint'], function () {
//  gulp.src('test/index.js')
//    .pipe(exec('istanbul cover <%= file.path %>'));
});

gulp.task('build-js', function () {
//    gulp.src(paths.src.js + '**')
//    // .pipe(uglify({
//    //   outSourceMap: true,
//    //   preserveComments: 'some'
//    // }))
//    .pipe(gulp.dest(paths.dest.js));

//  var rjsConfig = {
//    baseUrl: 'bower_components',
//    name: packageName + '/index',
//    include: 'requirejs/require',
//    out: packageName + '.js',
//    paths: {
//      modernizr: 'modernizr/modernizr',
//      jquery: 'jquery/dist/jquery',
//      bootstrap: 'bootstrap/dist/js/bootstrap',
//      'bootstrap-progressbar': 'bootstrap-progressbar/bootstrap-progressbar',
//      easypie: 'easypie/dist/jquery.easypiechart',
//    },
//    shim: {
//      bootstrap: ['jquery']
//    }
//  };
//  rjsConfig.paths[packageName] = '../js';
//
//  rjs(rjsConfig)
//    // .pipe(uglify({
//    //   outSourceMap: true,
//    //   preserveComments: 'some'
//    // }))
//    .pipe(gulp.dest(paths.dest.js));
});
gulp.task('build-images', function () {
  gulp.src(paths.src.images)
    .pipe(gulp.dest(paths.dest.images));
});
gulp.task('build-fonts', function () {
  gulp.src(paths.src.fonts)
    .pipe(flatten())
    .pipe(gulp.dest(paths.dest.fonts));
});
gulp.task('build-less', ['build-images', 'build-fonts'], function () {
  gulp.src(paths.src.less)
    .pipe(less({paths: [], compress: true}))
    .pipe(gulp.dest(paths.dest.css));
});
gulp.task('build', ['build-js', 'build-less', 'build-fonts']);
gulp.task('watch', ['build'], function () {
  gulp.watch(paths.src.js.concat(['!gulpfile.js']), ['build-js']);
  gulp.watch(paths.src.less, ['build-less']);
  gulp.watch(paths.src.fonts, ['build-fonts']);
});

gulp.task('default', ['test', 'build']);
