module.exports = {
    // 站点相关
    name: 'alloyteam-simple',
    // 项目 cdn 根，对应 alloydist 发布系统的 public/cdn/
    cdn: 'http://s.url.cn/qqun/qqfind/search/',
    // 项目 html 根，对应 alloydist 发布系统的 public/webserver/
    webServer: 'http://find.qq.com/search/',
    // 子模块
    subMoudle: 'sub/',
    // 模板相关
    tpl: [{
        target: 'tpl/index.js',
        include: [
            'tpl/index/*.html'
        ]
    }],
    // 合并相关
    concat: [{
        target: 'js/index.js',
        include: [
            'js/common/config.js',
            'js/common/global.js',
            'tpl/index.js',
            'js/index/*.js'
        ]
    }, {
        target: 'js/inline.js',
        include: [
            'js/common/config.js',
            'js/index/*.js'
        ],
        inline: 1
    }],
    // alloykit 离线相关
    // 是否打离线包
    zip: 1,
    zipBlacklist: [],
    // 使用 alloydist 发布离线包
    offline: {
        // alloykit bid, 需要修改
        'bid': 128,
        'publish': true,
        'compatible': 0,
        'version': 0,
        'platform': [2, 3],
        'loadmode': 2,
        'frequency': 1,
        'gray': true,
        'uins': []
    }
}
