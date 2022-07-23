const { parallel } = require('gulp');
const { src, dest } = require('gulp');
const { watch, series } = require('gulp');
const ext = require('gulp-ext-replace');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-clean-css');
const gulp = require("gulp");

var paths = {
    css: [
        'css/wpProQuiz_front.css'
    ],
    js: [
        'js/wpProQuiz_admin.js',
        'js/wpProQuiz_front.js',
        'js/wpProQuiz_toplist.js'
    ]
};

function css() {
    return src(paths.css)
        .pipe(ext('min.css'))
        .pipe(minifyCss({
            compatibility: 'ie7'
        }))
        .pipe(dest('css'));
}

function javascript() {
    return src(paths.js)
        .pipe(ext('min.js'))
        .pipe(uglify())
        .pipe(dest('js'));
}

exports.build = parallel(css, javascript)
exports.default = function() {
    watch(paths.css, css);
    watch(paths.js, javascript);
}