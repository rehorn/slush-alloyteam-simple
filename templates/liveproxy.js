var express = require('liveproxy').express;

function log(req) {
    console.log('[mocker]: ' + req.url);
};

var router1 = express.Router();
router1.get('/v1/post/:id', function(req, res, next) {
    log(req);
    res.end('v1 called');
});

module.exports = {
    cwd: './dist',
    // proxyAgent: 'proxy.tencent.com:8080',
    handler: [{
        match: 'find.qq.com/index.html',
        action: './'
    }, {
        match: 'find.qq.com/',
        action: './'
    }, {
        match: 's.url.cn/qqun/qqfind/search/',
        action: './'
    }],
    mocker: [{
        match: 'cgi.find.qq.com',
        action: router1
    }],
    router: [{
        match: 'find.qq.com/cgi-bin/',
        action: '-'
    }, {
        match: 'find.qq.com/',
        action: '10.12.23.156:8080'
    }],
    extender: [{
        match: 'find.qq.com/cgi-bin/',
        action: {
            func: 'delay',
            args: 5
        }
    }, {
        match: 'find.qq.com/',
        action: {
            func: 'addResponseHeader',
            args: ['powered', 'alloyteam']
        }
    }]
};
