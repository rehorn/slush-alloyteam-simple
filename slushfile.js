var gulp = require('gulp'),
    gutil = require('gulp-util'),
    install = require('gulp-install'),
    template = require('gulp-template'),
    gulpif = require('gulp-if'),
    path = require('path'),
    url = require('url'),
    inquirer = require('inquirer');

gulp.task('default', function(done) {
    gutil.log('slush-alloyteam-simple');

    var tplFiles = function(file) {
        var basename = path.basename(file.path);
        return basename === 'project.js';
    };

    inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'WebApp名称 -> '
        }, {
            type: 'input',
            name: 'webServer',
            message: 'html根目录，如: http://find.qq.com/qqun/search/ -> '
        }, {
            type: 'input',
            name: 'cdn',
            message: 'cdn根目录，如: http://s.url.cn/qqun/qqfind/search/ -> '
        }, {
            type: 'input',
            name: 'subMoudle',
            message: '子模块名字或留空 -> '
        }, {
            type: 'confirm',
            name: 'moveon',
            message: '开始初始化项目? -> '
        }],
        function(answers) {
            if (!answers.moveon) {
                return done();
            }

            // alloydist mapping setting suggestion
            answers.distCdnDir = '/data/sites/cdn.qplus.com' + url.parse(answers.cdn).pathname;
            answers.distHtmlDir = '/data/sites/' + url.parse(answers.html).hostname + url.parse(answers.html).pathname;

            gulp.src(__dirname + '/templates/**') // Note use of __dirname to be relative to generator
            .pipe(gulpif(tplFiles, template(answers))) // Lodash template support
            .pipe(gulp.dest('./')) // Without __dirname here = relative to cwd
            // .pipe(install()) // Run `bower install` and/or `npm install` if necessary
            .on('finish', function() {
                done(); // Finished!
            });
        });
});
