// require请求本地安装的gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// 创建一个任务（编译sass的任务）
// gulp.task()
gulp.task('compileSass',function(){
	// console.log('编译sass文件')
	
	// 怎么样编译sass
	// 用gulp.src找到要编译的sass文件
	gulp.src('./src/sass/style.scss')

	// 编译sass
		.pipe(sass({outputStyle:'compact'}))

	// 输出编译后的css文件
		.pipe(gulp.dest('./src/css'))

		// sass编译完成后刷新
		.pipe(browserSync.reload({stream:true}))
});

// 监听编译（sass文件有修改就直接编译）
gulp.task('autoCompile',function(){
	gulp.watch('./src/sass/style.scss',['compileSass']);
})

// 浏览器同步测试
gulp.task('server',function(){
	browserSync.init({
		server:{baseDir:'./src'}
	});

	// **代表任意目录
	// *代表任意文件名
	gulp.watch('./src/**/*.html').on('change',browserSync.reload);
	gulp.watch('./src/css/*.css').on('change',browserSync.reload);
	gulp.watch('./src/js/*.js').on('change',browserSync.reload);
	
	// Sass编译完成后再刷新
	gulp.watch('./src/sass/*.scss',['compileSass']);
});
