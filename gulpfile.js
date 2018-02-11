'use strict';

const gulp              = require('gulp'),
	  browserSync       = require('browser-sync'),
	  plugins 			= require('gulp-load-plugins')();
	
// Paths
const reload = browserSync.reload,
	  dest = 'dist/',
	  clearDir = 'dist',
	  src = '',
	  path = {
		build: {
			page:   dest,
			styles: dest + 'css',
			fonts:  dest + 'css/fonts',
			img:    dest + 'img',
			js:     dest + 'js',
			jsMin:  dest + 'js'
		},
		watch: {
			page:   'modules/**/*.+(html|php)',
			sass:   'css/*.sass',
			fonts:  'css/fonts/*',
			img:    'img/**/*',
			js:     'js/**/*.js',
			jsMin:  'js/**/*.+(min.js)'
		},
		assets: {
			page:   'modules/**/*.+(html|php)',
			style:  'css/style.sass',
			fonts:  'css/fonts/*',
			img:    'img/**/*',
			js:     'js/**/*.js',
			jsMin:  'js/**/*.min.js'
		}
	};
	
// Error
function errorhandler() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: 'Compile Error',
        message: '<%= error.message %>',
    }).apply(this, args);
    this.emit('end');
};

// PAGE
function page() {
  return gulp.src(path.assets.page)
    .pipe(plugins.fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(dest))
	.pipe(reload({stream:true}));
};

// PAGE production
function pageP() {
  return gulp.src(path.assets.page)
    .pipe(plugins.fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(dest))
	.pipe(plugins.htmlmin({collapseWhitespace: true}))
	.pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest(dest))
	.pipe(reload({stream:true}));
};
	
// Стили 
function styles() {
    return gulp.src(path.assets.style)
		.pipe(plugins.changed(path.build.styles))
		.pipe(plugins.sass().on( 'error', plugins.notify.onError(
			{message: "<%= error.message %>",
				title  : "Sass Error!"})))
		.pipe(plugins.autoprefixer({ browsers: ['last 16 versions'], cascade: false }))
		//.pipe(plugins.rev())
		.pipe(gulp.dest(path.build.styles))
		.pipe(reload({stream:true}));
};

// Стили production
function stylesP() {
    return gulp.src(path.assets.style)
		.pipe(plugins.changed(path.build.styles))
		//.pipe(sourcemaps.init())
		.pipe(plugins.sass().on( 'error', plugins.notify.onError(
			{message: "<%= error.message %>",
				title  : "Sass Error!"})))
		.pipe(plugins.autoprefixer({ browsers: ['last 16 versions'], cascade: false }))
		.pipe(gulp.dest(path.build.styles))
		.pipe(plugins.cleanCss())
		//.pipe(sourcemaps.write())
		.pipe(plugins.criticalCss())
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(gulp.dest(path.build.styles))
		.pipe(reload({stream:true}));
};

// Конвертируем шрифты в base64
function fc() {
	return gulp.src([path.assets.fonts + '.{woff,woff2}'])
		.pipe(plugins.cssfont64())
		.pipe(gulp.dest(path.build.styles));
};

// fonts
function fonts() {
	return gulp.src(path.assets.fonts)
		.pipe(plugins.changed(path.build.fonts))
		.pipe(gulp.dest(path.build.fonts))
		.pipe(reload({stream:true}));
};

// Скрипты js
function js() {
	return gulp.src([path.assets.js, '!js/**/*.min.js'])
		.pipe(plugins.changed(path.build.js))
		.pipe(plugins.jscpd({
				'min-lines': 10,
				verbose    : true
			}))
		.on( 'error', plugins.notify.onError(
		  {
			message: "<%= error.message %>",
			title  : "JS Error!"
		  }))
		.pipe(plugins.jshint.reporter('default'))  
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream:true}));
};

// Скрипты jsMin
function jsMin() {
	return gulp.src(path.assets.jsMin)
		.pipe(plugins.changed(path.build.jsMin))
		.pipe(gulp.dest(path.build.jsMin))
		.pipe(reload({stream:true}));
};

// Скрипты jsProdaction
function jsP() {
	return gulp.src([path.assets.js, '!js/**/*.min.js'])
		.pipe(plugins.changed(path.build.js))
		//.pipe(concat('main.js'))
		.pipe(plugins.rename({ suffix: '.min' }))
		.pipe(plugins.uglify().on( 'error', plugins.notify.onError(
		  {
			message: "<%= error.message %>",
			title  : "JS Error!"
		  })))
		.pipe(gulp.dest(path.build.js));
};

// Скрипты jsMinProdaction
function jsMinP() {
	return gulp.src([path.assets.js, '!js/**/*.min.js'])
		.pipe(plugins.changed(path.build.js))
		.pipe(plugins.rename({ suffix: '.min' }))
		.pipe(plugins.uglify().on( 'error', plugins.notify.onError(
		  {
			message: "<%= error.message %>",
			title  : "JS Error!"
		  })))
		.pipe(gulp.dest(path.build.js));
};

// Изображения
function img() {
	return gulp.src(path.assets.img)
		.pipe(plugins.changed(path.build.img))
		.pipe(gulp.dest(path.build.img))
		.pipe(reload({stream:true}));
};

// Изображения production
function imgP() {
	return gulp.src(path.assets.img)
		.pipe(plugins.changed(path.build.img))
		.pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest(path.build.img))
		//.pipe(notify( 'IMG task complete!' ))
		.pipe(reload({stream:true}));
};

// Очистка
function clear() {
	return gulp.src(clearDir, {read: false})
		.pipe(plugins.clean());
};


// zip
function zipFunc() {
    return gulp.src(dest)
        .pipe(plugins.zip('archive.zip'))
        .pipe(gulp.dest(dest));
};

// Server connect
function browserSyncFunc(cb) {
	browserSync.init({
		proxy: "project.dev",
		notify: false,
		open: false
    }, cb);
};

// Наблюдение
function watch() {
	// Наблюдение за .sass файлами
	gulp.watch(path.watch.sass, styles)
	// Наблюдение за .js файлами
	gulp.watch(path.watch.js, js)
	// Наблюдение за .min.js файлами
	gulp.watch(path.watch.jsMin, jsMin)
	// Наблюдение за img файлами
	gulp.watch(path.watch.img, img)
	// Наблюдение за fonts файлами
	gulp.watch(path.watch.fonts, fonts)
	// Наблюдение за fonts файлами
	gulp.watch(path.watch.page, page);
};

// Задача по-умолчанию
gulp.task('default', gulp.parallel(browserSyncFunc, styles, fonts, img, js, jsMin, page, watch));
gulp.task('prod', gulp.parallel(browserSyncFunc, stylesP, fonts, imgP, jsP, jsMinP, pageP, fc, watch));
gulp.task('clear', clear);
//gulp.task('page', page);
//gulp.task('js', gulp.parallel(js, jsMin));

// Production
/* gulp.task('product', [cleanDir], function() {
	gulp.start('styles', 'fonts', 'img', 'js');
}); */
