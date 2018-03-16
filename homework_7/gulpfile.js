'use strict';

var gulp = require('gulp'),
    jquery = require('jquery'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),     //для вставки/ипорта, если хотим сшить в один файт часть в body, header etc
    imagemin = require('gulp-imagemin');

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Создаем файлы в папку distr
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш js файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(browserSync.reload({
            stream: true
        }));

});

gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        // .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);
gulp.task('browserSync',function () {
    browserSync({
        server:{
            baseDir:'template'
        }
    })
});


var path = {
    build:{
        html: 'dist/',
        js: 'dist/js',
        css: 'dist/css',
        fonts: 'dist/fonts'
    },
    src:{
            html:'*.html',
            js:'*.js',
            style:'*.css',
            img:'pic/**/*.*',
            fonts:'fonts/**/*.*'
},
    watch:{
          html:'*.html',
          js:'*.js',
            style:'*.css',
            img:'pic/**/*.*',
        fonts:'fonts/**/*.*'
    },
        clean:'.build'
};


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['build', 'browserSync', 'watch']);

