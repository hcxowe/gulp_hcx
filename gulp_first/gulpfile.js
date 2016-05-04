// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var atpref = require('gulp-autoprefixer');
var mincss = require('gulp-minify-css');

// 检查脚本
gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('css', function(){
	gulp.src('./css/*.css')
		.pipe(atpref())
		.pipe(concat('all.min.css'))
		.pipe(mincss())
		.pipe(gulp.dest('./dist'));
})

// 默认任务
gulp.task('default', function(){
    gulp.run('lint', 'css', 'scripts');

    // 监听文件变化
    gulp.watch(['./js/*.js','./css/*.css'], function(){
        gulp.run('lint', 'css', 'scripts');
    });
});