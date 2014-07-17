var gulp = require('gulp'),
    gutil = require('gulp-util'),
    install = require('gulp-install'),
    template = require('gulp-template'),
    inquirer = require('inquirer');

gulp.task('default', function(done) {
    gutil.log('slush-alloyteam-simple');

    inquirer.prompt([{
                type: 'input',
                name: 'name',
                message: 'WebApp名称',
                default: gulp.args.join(' ')
            }, {
                type: 'input',
                name: 'webServer',
                message: 'html根目录，如: http://find.qq.com/qqun/search/',
                default: gulp.args.join(' ')
            }, {
                type: 'input',
                name: 'cdn',
                message: 'cdn根目录，如: http://s.url.cn/qqun/qqfind/search/',
                default: gulp.args.join(' ')
            }, {
                type: 'input',
                name: 'subMoudle',
                message: '子模块名字或留空',
                default: gulp.args.join(' ')
            }, {
                type: 'confirm',
                name: 'moveon',
                message: '开始初始化项目?'
            }
        ],
        function(answers) {
            if (!answers.moveon) {
                return done();
            }
            gulp.src(__dirname + '/templates/**') // Note use of __dirname to be relative to generator
                .pipe(template(answers)) // Lodash template support
                .pipe(gulp.dest('./')) // Without __dirname here = relative to cwd
                // .pipe(install()) // Run `bower install` and/or `npm install` if necessary
                .on('finish', function() {
                    done(); // Finished!
                });
        });
});
