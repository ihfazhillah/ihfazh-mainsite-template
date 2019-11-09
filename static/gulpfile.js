var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var pkg = require('./package.json');

// Set the banner content
// var banner = ['/*!\n',
//     ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
//     ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
//     ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
//     ' */\n',
//     ''
// ].join('');

// // Compile LESS files from /less into /css
// gulp.task('less', function() {
//     var f = filter(['*', '!mixins.less', '!variables.less']);
//     return gulp.src('less/*.less')
//         .pipe(f)
//         .pipe(less())
//         .pipe(header(banner, { pkg: pkg }))
//         .pipe(gulp.dest('css'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// });

// // Minify compiled CSS
// gulp.task('minify-css', ['less'], function() {
//     return gulp.src('css/freelancer.css')
//         .pipe(cleanCSS({ compatibility: 'ie8' }))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest('css'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// });

// // Minify JS
// gulp.task('minify-js', function() {
//     return gulp.src('js/freelancer.js')
//         .pipe(uglify())
//         .pipe(header(banner, { pkg: pkg }))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(gulp.dest('js'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// });

 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(gulp.dest('vendor/bootstrap'))

    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('vendor/jquery'))

    gulp.src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(gulp.dest('vendor/font-awesome'))
})

// Run everything
gulp.task('default', ['sass', 'sass:watch', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'sass', 'sass-watch'], function() {
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('./assets/sass/**/*.scss');
    gulp.watch('../*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});
