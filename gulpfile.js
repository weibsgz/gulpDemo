/**
 * Created by weibin on 2016/10/12.
 */
//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'); //本地安装gulp所用到的地方
var fileinclude  = require('gulp-file-include');  //包含HTML
var connect = require('gulp-connect'); //本地服务
var imagemin = require('gulp-imagemin'); //图片压缩
var watch = require('gulp-watch'); //监听



//本地服务
gulp.task('webserver', function() {
    connect.server({
        port: 8080,      //修改端口
        livereload: true   //添加实时刷新，需要watch相应的css.js,html文件
    });
});

//include html并刷新服务器
gulp.task('fileinclude', function() {
    gulp.src('src/html/**.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist/html')).pipe(connect.reload());
});

//压缩图片
gulp.task('imagemin', function() {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images')).pipe(connect.reload());
});

//打包CSS进入到dist目录
gulp.task('csstodist', function() {
    gulp.src('src/css/*')
.pipe(gulp.dest('dist/css')).pipe(connect.reload());
});

//打包JS到dist目录
gulp.task('jstodist', function() {
    gulp.src('src/js/*')
        .pipe(gulp.dest('dist/js')).pipe(connect.reload());
});

//监听所有HTML JS CSS改动
gulp.task('watch', function () {
    gulp.watch(['src/css/*','src/html/**.html','src/js/*','src/images/*'], ['jstodist','csstodist','fileinclude','imagemin']);
});


gulp.task('default',['fileinclude','webserver','imagemin','csstodist','jstodist','watch']);
