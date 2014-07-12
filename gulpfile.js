// =================
// 配置项
// =================
var configs = {
    site: {
        name: 'proj',
        cdn: 'http://s.url.cn/qqun/qqfind/search/',
        webServer: 'http://find.qq.com/search/'
    },
    // 一般不需要修改
    paths: {
        src: 'src/',
        dist: 'dist/',
        tmp: '.tmp/',
        deploy: 'public/',
        imgType: '*.{jpg,jpeg,png,bmp,gif,ttf,ico,htc}',
        cssRev: '.tmp/.cssrev/',
        jsRev: '.tmp/.jsrev/'
    },
    minify: {
        html: 0,
        js: 1,
        css: 1,
        img: 0
    },
    helper: {
        banner: 1
    }
};

configs.qzmin = {
    tpl: [{
        target: 'tpl/index.js',
        include: [
            'tpl/index/index.html'
        ]
    }],
    concat: [{
        target: 'js/index.js',
        include: [
            'js/common/config.js',
            'js/common/global.js',
            'js/index/index.js'
        ]
    }, {
        target: 'js/inline.js',
        include: [
            'js/common/config.js',
            'js/index/index.js'
        ],
        inline: 1
    }]
};

// =================
// 不要修改以下内容
// alloyteam simple project build gulpfile
// =================
var gulp = require('gulp');
var runSequence = require('run-sequence');
var md5 = require('MD5');

var fs = require('fs');
var path = require('path');

var compass = require('gulp-compass'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    minifyHtml = require('gulp-minify-html'),
    concat = require('gulp-concat'),
    savefile = require('gulp-savefile'),
    htmlrefs = require('gulp-htmlrefs'),
    jsrefs = require('gulp-jsrefs'),
    watch = require('gulp-watch');

var src = configs.paths.src,
    dist = configs.paths.dist,
    tmp = configs.paths.tmp;

function isUndefined(obj) {
    return obj === void 0;
};

// remove old or tmp files
gulp.task('clean', function() {
    var opt = {
        read: false
    };
    return gulp.src([dist, tmp], opt)
        .pipe(clean({
            force: true
        }));
});

// default src folder options
var opt = {
    cwd: src,
    base: src
};

// copy js/html from src->dist
gulp.task('copy', function() {
    return gulp.src(['*.html', 'js/*.js', 'js/libs/**/*.js', 'img/static/' + configs.paths.imgType], opt)
        .pipe(gulp.dest(dist));
});

// copy and rev some images files [filename-md5.png style]
gulp.task('img-rev', function() {
    // img root 
    gulp.src('img/' + configs.paths.imgType, opt)
        .pipe(rename(function(_path) {
            // md5 rename
            var fullpath = path.join(src, _path.dirname, _path.basename + _path.extname);
            _path.basename += '-' + md5(fs.readFileSync(fullpath)).slice(0, 8)
        }))
        .pipe(gulp.dest(dist));
});

// compile scss and auto spriting 
gulp.task('compass', function() {
    return gulp.src('**/*.scss', opt)
        .pipe(compass({
            config_file: './config.rb',
            css: dist,
            sass: src,
            image: src + 'img/'
        }))
        .pipe(gulp.dest(dist));
});

// compile tpl 
gulp.task('tpl', function() {

});

// concat files using qzmin config
gulp.task('concat', function() {
    // concat js/css file
    configs.qzmin.concat.forEach(function(item) {
        item.inline = isUndefined(item.inline) ? 0 : item.inline;
        var opt = {
            cwd: src
        };
        var dest = dist;
        if (item.inline) {
            dest = tmp;
        } else {
            dest = dist;
        }
        gulp.src(item.include, opt)
            .pipe(concat(item.target))
            .pipe(gulp.dest(dest));
    });
});

// minify js
// stand alone cmd to make sure all js minified
// known bug: htmlrefs 在 rev 走后，可能会不准
gulp.task('uglify', function() {
    return gulp.src('{' + dist + ',' + tmp + '}/**/*.js')
        .pipe(uglify())
        .pipe(clean())
        .pipe(rev())
        .pipe(savefile())
        .pipe(rev.manifest())
        .pipe(gulp.dest(configs.paths.jsRev))
});

// minify css
// stand alone cmd to make sure all css minified
gulp.task('minifyCss', function() {
    return gulp.src('{' + dist + ',' + tmp + '}/**/*.css')
        .pipe(minifyCss())
        .pipe(clean())
        .pipe(rev())
        .pipe(savefile())
        .pipe(rev.manifest())
        .pipe(gulp.dest(configs.paths.cssRev))
});

gulp.task('htmlrefs', function() {
    gulp.src(src + '*.html')
        .pipe(htmlrefs({
            urlPrefix: configs.site.cdn,
            scope: [src, tmp],
            manifest: ['**/rev-mainfest.json']
        }))
        .pipe(savefile());
});

gulp.task('minifyHtml', function() {
    return gulp.src(src + '*.html')
        .pipe(minifyHtml({
            empty: true
        }))
        .pipe(savefile())
});

gulp.task('dev', function() {
    runSequence('clean', ['copy', 'img-rev', 'compass', 'concat']);
});

gulp.task('dist', function() {
    runSequence('clean', ['copy', 'img-rev', 'compass', 'concat'], [ /*'imagemin, '*/ 'uglify', 'minifyCss'], 'htmlrefs');
});

gulp.task('default', ['dist']);
