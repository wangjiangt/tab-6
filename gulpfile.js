var gulp = require('gulp');
var server = require('gulp-webserver');
var scss = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var path = require('path');
var fs = require('fs');
var url = require('url');
// 起服务
gulp.task('server', function () {
    gulp.src('src')
        .pipe(server({
            port:8080,
            middleware:function (req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if(pathname === '/favicon.ico'){
                    return false;
                }

                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }
        }));
});

gulp.task('devCss', function () {
    gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', function () {
    gulp.watch('./src/scss/*.scss', ['devCss']);
});

gulp.task('dev', ['devCss', 'watch','server']);