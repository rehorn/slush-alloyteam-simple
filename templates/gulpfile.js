// =================
// alloyteam simple project build gulpfile
// author: rehornchen@tencent.com
// version: 0.1.0
// created: 2014-07-15
// history:
// 0.2.0 2014-07-15 support htmlrefs rev alloykit-offline
// 0.1.0 2014-07-15 init
// --------------------
// 不要修改以下内容
// =================
var gulp = require('gulp');
var runSequence = require('run-sequence');
var md5 = require('MD5');

var fs = require('fs');
var path = require('path');
var url = require('url');
var _ = require('lodash');
var async = require('async');

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
    jstemplate = require('gulp-jstemplate-compile'),
    zip = require('gulp-zip'),
    newer = require('gulp-newer'),
    watch = require('gulp-watch');

// =================
// configs
// =================
var configs = {
    // about site global
    name: 'alloyteam-simple-default',
    cdn: 'http://s.url.cn/qqun/',
    webServer: 'http://find.qq.com/',
    subMoudle: '',

    // path related
    src: './src/',
    dist: './dist/',
    tmp: './.tmp/',
    deploy: './public/',
    offlineCache: './.offline/',
    imgType: '*.{jpg,jpeg,png,bmp,gif,ttf,ico,htc}',
    cssRev: './.tmp/.cssrev/',
    jsRev: './.tmp/.jsrev/',
    // jsContentRevScope: '**/*.js',
    jsContentRevScope: '',

    // compress related
    minifyHtml: 0,
    minifyImage: 0,

    // template related
    tpl: [],
    tplDefautInline: 1,
    // combine related
    concat: [],

    // offline related
    zip: 1,
    zipConf: [],
    zipName: 'offline.zip',
    offline: '',

    // other
    timeStampBanner: 1
};

// overwrite configs
_.extend(configs, require('./project') || {});

// prepare root with subModule case
configs.cdnRoot = configs.cdn + configs.subMoudle;
configs.webServerRoot = configs.webServer + configs.subMoudle;

// set default alloykit offline zip config
var globCdn = ['**/*.*', '!**/*.{html,ico}'];
var globWebServer = ['**/*.{html,ico}'];
if (configs.zip && _.isEmpty(configs.zipConf)) {
    configs.zipConf = [{
        target: configs.cdnRoot,
        include: globCdn
    }, {
        target: configs.webServerRoot,
        include: globWebServer
    }];

    if (!_.isEmpty(configs.zipBlacklist)) {
        // prefix '!' to exclude
        _.map(configs.zipBlacklist, function(item) {
            return '!' + item;
        });
        // union
        _.each(configs.zipConf, function(item) {
            _.union(item.include, configs.zipBlacklist)
        });
    }
}

var customMinify = ['noop'];
if (configs.minifyHtml) {
    customMinify.push('minifyHtml');
}
if (configs.minifyImage) {
    customMinify.push('imagemin');
}

// global vars
var src = configs.src,
    dist = configs.dist,
    tmp = configs.tmp,
    deploy = configs.deploy,
    offlineCache = configs.offlineCache;

// default src folder options
var opt = {
    cwd: src,
    base: src
};
var distOpt = {
    cwd: dist,
    base: dist
};

function isUndefined(obj) {
    return obj === void 0;
};

console.log('start to build project [' + configs.name + ']...');

// remove old or tmp files
gulp.task('clean', function() {
    var opt = {
        read: false
    };
    return gulp.src([dist, tmp, deploy, offlineCache], opt)
        .pipe(clean({
            force: true
        }));
});

// copy js/html from src->dist
var things2copy = ['*.{html,ico}', 'js/*.js', 'js/libs/**/*.js', 'img/static/' + configs.imgType];
gulp.task('copy', function() {
    return gulp.src(things2copy, opt)
        .pipe(newer(dist))
        .pipe(gulp.dest(dist));
});

// copy and rev some images files [filename-md5.png style]
var image2copy = 'img/' + configs.imgType;
gulp.task('img-rev', function() {
    // img root 
    return gulp.src(image2copy, opt)
        .pipe(newer(dist))
        .pipe(rename(function(_path) {
            // md5 rename
            var fullpath = path.join(src, _path.dirname, _path.basename + _path.extname);
            _path.basename += '-' + md5(fs.readFileSync(fullpath)).slice(0, 8)
        }))
        .pipe(gulp.dest(dist));
});

// compile scss and auto spriting 
var scss2compile = '**/*.scss';
gulp.task('compass', function(cb) {
    return gulp.src(scss2compile, opt)
        .pipe(newer(dist))
        .pipe(compass({
            config_file: './config.rb',
            css: dist,
            sass: src,
            image: src + 'img/',
            generated_image: dist + 'img/sprite'
        }))
        .pipe(gulp.dest(dist));
});

// compile tpl 
var tpl2compile = 'tpl/**/*.html';
gulp.task('tpl', function(cb) {
    // concat js/css file
    var q = _.map(configs.tpl, function(item) {
        return function(callback) {
            gulp.src(item.include, opt)
                .pipe(newer(dist))
                .pipe(jstemplate())
                .pipe(concat(item.target))
                .pipe(gulp.dest(dist))
                .on('end', function() {
                    callback();
                });
        };
    });

    async.parallel(q, function(err, result) {
        cb(err, result);
    });
});

// concat files using qzmin config
var js2concat = ['**/*.js', 'tpl/**/*.html'];
gulp.task('concat', ['tpl'], function(cb) {
    // concat js/css file
    var q = _.map(configs.concat, function(item) {
        return function(callback) {

            gulp.src(item.include, opt)
                .pipe(newer(dist))
                .pipe(concat(item.target))
                .pipe(gulp.dest(dist))
                .on('end', function() {
                    callback();
                });
        };
    });

    async.parallel(q, function(err, result) {
        cb(err, result);
    });
});

// remove tpl complie .js cache 
gulp.task('concat-clean', function(cb) {
    // remove inline 
    var q = _.map(configs.tpl, function(item) {
        return function(callback) {
            item.inline = isUndefined(item.inline) ? 0 : item.inline;
            if (item.inline) {
                gulp.src(item.target, distOpt)
                    .pipe(clean())
                    .pipe(gulp.dest(tmp))
                    .on('end', function() {
                        callback();
                    });
            } else {
                callback();
            }
        };
    });

    async.parallel(q, function(err, result) {
        cb(err, result);
    });
});

// remove tpl complie .js cache 
gulp.task('tpl-clean', function(cb) {
    // remove inline 
    var q = _.map(configs.tpl, function(item) {
        return function(callback) {
            item.inline = isUndefined(item.inline) ? configs.tplDefautInline : item.inline;
            if (item.inline) {
                gulp.src(item.target, distOpt)
                    .pipe(clean())
                    .pipe(gulp.dest(tmp))
                    .on('end', function() {
                        callback();
                    });
            } else {
                callback();
            }
        };
    });

    async.parallel(q, function(err, result) {
        cb(err, result);
    });
});

// minify js and generate reversion files
// stand alone cmd to make sure all js minified
// known bug: htmlrefs 在 rev 走后，可能会不准
gulp.task('uglify', function() {
    return gulp.src('{' + dist + ',' + tmp + '}/**/*.js')
        .pipe(uglify())
        .pipe(clean())
        .pipe(rev())
        .pipe(savefile())
        .pipe(rev.manifest())
        .pipe(gulp.dest(configs.jsRev))

});

// minify css and generate reversion files
// stand alone cmd to make sure all css minified
gulp.task('minifyCss', function() {
    return gulp.src('{' + dist + ',' + tmp + '}/**/*.css')
        .pipe(minifyCss())
        .pipe(clean())
        .pipe(rev())
        .pipe(savefile())
        .pipe(rev.manifest())
        .pipe(gulp.dest(configs.cssRev))
});

// replace html/js/css reference resources to new md5 rev version
// inline js to html, or base64 to img
gulp.task('htmlrefs', function(cb) {
    var mapping;
    var jsRev = configs.jsRev + 'rev-manifest.json';
    var cssRev = configs.cssRev + 'rev-manifest.json';
    if (fs.existsSync(jsRev) && fs.existsSync(cssRev)) {
        mapping = _.extend(
            require(jsRev),
            require(cssRev)
        );
    }

    var refOpt = {
        urlPrefix: configs.cdnRoot,
        scope: [dist, tmp],
        mapping: mapping
    };

    var tasks = [];

    // 由 compass 负责 image-url 替换
    // var cssRefTask = function(callback) {
    //     gulp.src(dist + '**/*.css')
    //         .pipe(htmlrefs(refOpt))
    //         .pipe(gulp.dest(dist))
    //         .on('end', function() {
    //             callback();
    //         });
    // };
    // tasks.push(cssRefTask);

    if (configs.jsContentRevScope) {
        var jsRefTask = function(callback) {
            gulp.src(configs.jsContentRevScope, distOpt)
                .pipe(htmlrefs(refOpt))
                .pipe(gulp.dest(dist))
                .on('end', function() {
                    callback();
                });
        };
        tasks.push(cssRefTask);
    }

    var htmlRefTask = function(callback) {
        gulp.src(dist + '*.html')
            .pipe(htmlrefs(refOpt))
            .pipe(gulp.dest(dist))
            .on('end', function() {
                callback();
            });
    };
    tasks.push(htmlRefTask);

    async.series(tasks, function(err, result) {
        cb(err, result);
    });
});

gulp.task('minifyHtml', function() {
    return gulp.src(src + '*.html')
        .pipe(minifyHtml({
            empty: true
        }))
        .pipe(savefile());
});

gulp.task('noop', function(cb) {
    cb();
});

gulp.task('imagemin', function() {
    return gulp.src(src + '**/' + configs.imgType)
        .pipe(imagemin())
        .pipe(savefile());
});

// alloydist intergration task, build files to public folder
// html -> public/webserver/**
// cdn -> public/cdn/**
gulp.task('alloydist-prepare', function(cb) {
    var deployGroup = [{
        target: deploy + 'cdn/' + configs.subMoudle,
        include: globCdn
    }, {
        target: deploy + 'webserver/' + configs.subMoudle,
        include: globWebServer
    }];

    var q = _.map(deployGroup, function(item) {
        return function(callback) {
            gulp.src(item.include, distOpt)
                .pipe(gulp.dest(item.target))
                .on('end', function() {
                    callback();
                });
        };
    });

    async.parallel(q, function(err, result) {
        cb(err, result);
    });

});

// prepare files to package to offline zip for alloykit
gulp.task('offline-prepare', function(cb) {
    var q = _.map(configs.zipConf, function(item) {
        return function(callback) {
            var urlObj = url.parse(item.target);
            var target = path.join(offlineCache, urlObj.hostname, urlObj.pathname);
            gulp.src(item.include, distOpt)
                .pipe(gulp.dest(target))
                .on('end', function() {
                    callback();
                });
        };
    });

    async.parallel(q, function(err, result) {
        cb(err, result);
    });

});

// package .offline -> offline.zip for alloykit
gulp.task('offline-zip', function() {
    return gulp.src('**/*.*', {
        cwd: offlineCache
    })
        .pipe(zip(configs.zipName))
        .pipe(gulp.dest(deploy + 'offline'));
});

// alloydist -> deloy test env
gulp.task('testenv', function() {
    // test env 

});

// alloydist -> prebuild and create ars publish order
gulp.task('ars', function() {
    // publish ars
    // 
});

// alloydist -> prebuild and auto post offline zip
gulp.task('offline', function(cb) {
    // publish offline zip

});

// clean all temp files
gulp.task('cleanup', function() {
    // cleanup
    return gulp.src([dist, tmp, deploy, offlineCache, './.sass-cache'], {
        read: false
    })
        .pipe(clean({
            force: true
        }));
});

// support browserify
gulp.task('browserify', function() {

});

// support requirejs
gulp.task('requirejs', function() {

});

// support local server & livereload
gulp.task('server', function() {

});

gulp.task('watch', function() {
    gulp.watch(things2copy, opt, ['copy']);
    gulp.watch(image2copy, opt, ['img-rev']);
    gulp.watch(scss2compile, opt, ['compass']);
    gulp.watch(js2concat, opt, ['concat']);
});

gulp.task('dev', function(cb) {
    runSequence('clean', ['copy', 'img-rev', 'compass', 'tpl'], 'concat', 'watch', cb);
});

gulp.task('dist', function(cb) {
    runSequence(
        'clean', ['copy', 'img-rev', 'compass', 'tpl'],
        'concat', ['tpl-clean', 'concat-clean', 'uglify', 'minifyCss'],
        'htmlrefs',
        customMinify,
        'alloydist-prepare',
        'offline-prepare',
        'offline-zip',
        cb);
});

gulp.task('default', ['dist']);
