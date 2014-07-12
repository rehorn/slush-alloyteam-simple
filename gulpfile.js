var gulpAlloyBuild = require('gulp-alloy-build');

var qzmin = {
    tpl: [{
        target: 'tpl/index.js',
        include: [
            'tpl/index/index.html'
        ],
        inline: 0
    }],
    js: [{
        target: 'js/index.js',
        include: [
            'js/common/config.js',
            'js/index/index.js'
        ],
        inline: 0
    }]
};

// default config
var options = {
    qzmin: qzmin,
    minify: {
        html: 0,
        js: 1,
        css: 1
    }
};

gulpAlloyBuild.init(options);
