var gulp = require('gulp'),
    gutil = require('gulp-util'),
    install = require('gulp-install'),
    template = require('gulp-template'),
    gulpif = require('gulp-if'),
    rename = require('gulp-rename'),
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

            if (!answers.webServer) {
                gutil.log('html根目录不能为空！');
                return done();
            }

            // set cdn default webserver
            answers.cdn = answers.cdn || answers.webServer;

            // alloydist mapping setting suggestion
            answers.distCdnDir = '/data/sites/cdn.qplus.com' + url.parse(answers.cdn).pathname;
            answers.distHtmlDir = '/data/sites/' + url.parse(answers.webServer).hostname + url.parse(answers.webServer).pathname;

            gulp.src(__dirname + '/templates/**')
            .pipe(gulpif(tplFiles, template(answers)))
            .pipe(rename(function(file) {
                if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                }
            }))
            .pipe(gulp.dest('./')) 
            // .pipe(install())
            .on('finish', function() {
                done();
            });
        });
});
