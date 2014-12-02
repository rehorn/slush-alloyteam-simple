var express = require('liveproxy').express;

// mocker cgi 路由模拟
// function log(req) {
//     console.log('[mocker]: ' + req.url);
// };

// var router1 = express.Router();
// router1.get('/v1/post/:id', function(req, res, next) {
//     log(req);
//     res.end('v1 called');
// });

module.exports = {
    // action 上下文目录
    cwd: './dist',

    // 外网访问代理
    // proxyAgent: 'proxy.tencent.com:8080',

    // 本地文件夹替换配置
    handler: [{
        match: '<%= webServerResolve %>index.html',
        action: './'
    }, {
        match: '<%= webServerResolve %>',
        action: './'
    }, {
        match: '<%= cdnResolve %>',
        action: './'
    }],

    // cgi mocker 模拟配置
    // mocker: [{
    //     match: 'cgi.find.qq.com',
    //     action: router1
    // }],

    // host/路由配置
    // router: [{
    //     match: 'find.qq.com/cgi-bin/',
    //     action: '-'
    // }, {
    //     match: 'find.qq.com/',
    //     action: '10.12.23.156:8080'
    // }],

    // 扩展配置，目前支持 [网络延迟delay], [添加response返回头addResponseHeader]
    // extender: [{
    //     match: 'find.qq.com/cgi-bin/',
    //     action: {
    //         func: 'delay',
    //         args: 5
    //     }
    // }, {
    //     match: 'find.qq.com/',
    //     action: {
    //         func: 'addResponseHeader',
    //         args: ['powered', 'alloyteam']
    //     }
    // }]
};
