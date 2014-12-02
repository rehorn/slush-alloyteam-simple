module.exports = {
    // 站点相关，项目名
    name: '<%= name %>',
    // 项目 cdn 根，对应 alloydist 发布系统的 public/cdn/
    cdn: '<%= cdn %>',
    // 项目 html 根，对应 alloydist 发布系统的 public/webserver/
    webServer: '<%= webServer %>',
    // 子模块名称
    subModule: '<%= subModule %>',
    // webpack: js 模块化相关
    webpack: {
        // 页面所引用 js 配置
        entry: {
            // 格式=> js名字: '入口路径', 在html 中引用 <script src='js/[js名字].js'></script>
            index: './src/js/index/index.js'
        },
        // 第三方库
        externals: {
            jQuery: "jQuery"
        }
    },
    // alloykit 离线相关
    zipBlacklist: [],
    // 使用 alloydist 发布离线包
    offline: {
        // 'bid': 128, // alloykit bid, 需要修改
        // 'publish': true,
        // 'compatible': 0,
        // 'qversionfrom': 0,
        // 'qversionto': 0,
        // 'platform': [2, 3],
        // 'loadmode': 2,
        // 'verifyType': 0,
        // 'expire_time': 1577836800000,
        // 'cdn': 'defaultCDN',
        // 'note': '',
        // 'frequency': 1,
        // 'gray': true,
        // 'uins': []
    },
    // 可选，alloydist发布单号，用于命令行发布
    distId: '',
    opUser: 'alloy-gulp',
    token: 'ASdxseRTSXfiGUIxnuRisTU',
    // jb 发布映射设置建议，不需改动
    distHtmlDir: '<%= distHtmlDir %>', // html映射
    distCdnDir: '<%= distCdnDir %>' // cdn映射
};
