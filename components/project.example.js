module.exports = {
    // 站点相关，项目名
    name: 'alloyteam-simple-app',
    // 项目 cdn 根，对应 alloydist 发布系统的 public/cdn/
    cdn: 'http://s.url.cn/qqfind/',
    // 项目 html 根，对应 alloydist 发布系统的 public/webserver/
    webServer: 'http://find.qq.com/',
    // 子模块名称
    subMoudle: '/',
    // webpack: js 模块化相关
    webpack: {
        entry: {
            index: './src/js/index/index.js'
        },
        output: {
            filename: '[name].js',
        },
        externals: {
            jQuery: "jQuery"
        },
        module: {
            loaders: [{
                test: /\.hbs$/,
                loader: "handlebars-loader"
            }]
        }
    },
    // jb.oa.com 相关配置
    // offline: {
    //     'bid': 128, // alloykit bid, 需要修改
    //     'publish': true,
    //     'compatible': 0,
    //     'qversionfrom': 0,
    //     'qversionto': 0,
    //     'platform': [2, 3],
    //     'loadmode': 2,
    //     'verifyType': 0,
    //     'expire_time': 1577836800000,
    //     'cdn': 'defaultCDN',
    //     'note': '',
    //     'frequency': 1,
    //     'gray': true,
    //     'uins': []
    // },
    // 可选，jb 部署单号，用于命令行操作
    distId: '',
    // 操作用户
    opUser: 'alloy-gulp',
    // 接口校验 token
    token: 'ASdxseRTSXfiGUIxnuRisTU',
    // jb 发布映射设置建议，不需改动
    distHtmlDir: '/data/sites/find.qq.com/', // html映射
    distCdnDir: '/data/sites/cdn.qplus.com/qqfind/' // cdn映射
};
