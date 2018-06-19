var gulp = require('gulp');
var server = require('gulp-webserver');
var autoprefixer = require("gulp-autoprefixer");
var fs = require('fs');
var url = require('url');
var path = require('path');
var uglify = require('gulp-uglify');
var minCss = require('gulp-clean-css');
var data = require('../week2/data/data.json')
    //起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8005,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                } else if (pathname === '/api/data') {
                    res.end(JSON.stringify(data));
                }
                pathname = pathname === '/' ? "/index.html" : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }
        }))
});
gulp.task('scss', function() {
    gulp.src('src/**/*.scss')
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(gulp.dest('build'))
})
gulp.task('uglify', function() {
    gulp.src('src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});
gulp.task("watch", function() {
        gulp.watch("src/scss/*.scss", ["scss"])
    })
    // gulp.task('default', ['uglify', 'server']);