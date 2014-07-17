module.exports = {
    // 站点相关
    name: '<%= name %>',
    // 项目 cdn 根，对应 alloydist 发布系统的 public/cdn/
    cdn: '<%= cdn %>',
    // 项目 html 根，对应 alloydist 发布系统的 public/webserver/
    webServer: '<%= webServer %>',
    // 子模块
    subMoudle: '<%= subMoudle %>/',
    // 模板相关
    tpl: [/*{
        target: 'tpl/index.js',
        include: [
            'tpl/index/*.html'
        ]
    }*/],
    // 合并相关
    concat: [/*{
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
    }*/],
    // alloykit 离线相关
    zipBlacklist: [], // 离线包黑名单
    // 使用 alloydist 发布离线包
    offline: {
        // 'bid': 128, // alloykit bid, 需要修改
        // 'publish': true,
        // 'compatible': 0,
        // 'version': 0,
        // 'platform': [2, 3],
        // 'loadmode': 2,
        // 'frequency': 1,
        // 'gray': true,
        // 'uins': []
    }
}
