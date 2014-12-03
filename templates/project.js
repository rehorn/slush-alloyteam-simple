module.exports = {
    // 站点相关，项目名
    name: '<%= name %>',
    // 项目 cdn 根，对应 alloydist 发布系统的 public/cdn/
    cdn: '<%= cdn %>',
    // 项目 html 根，对应 alloydist 发布系统的 public/webserver/
    webServer: '<%= webServer %>',
    // 子模块名称
    subModule: '<%= subModule %>',
    // 发布单号，用于命令行发布
    distId: '',
    // jb 发布映射设置建议，不需改动
    distHtmlDir: '<%= distHtmlDir %>', // html映射
    distCdnDir: '<%= distCdnDir %>' // cdn映射
};
