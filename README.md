slush-alloyteam-simple
==========================

Alloyteam Simple Web Apps generator base on slush & glup 

Alloyteam web 前端项目工程化模板

### 特性
1. 基于 gulp 进行构建，方便快捷，易于定制和插件支持
2. 最小化需配置项 (project.js)，基于约定优于配置理念
3. 所有资源使用增量发布策略，文件名全部 md5 版本化，让产品轻松支持多版本并存
2. [css] 使用 compass 编写模块化、可维护 css
2. [css] 使用 compass 自动 sprite 生成精灵图，自动生成版本化图片 (无需修改时间戳)
3. [js] 支持多种模块化策略，普通文件合并concat/requirejs/browserify
4. [js] 内置 js 模板引擎支持，jstemplate，发布前编译
5. [html] 自动替换 html 内部资源引用路径，替换为 cdn/md5 版本化路径
6. [html] 轻松支持 js/css 资源内嵌到页面
7. [工程化集成] 生成资源（alloykit离线包、web资源），对接内部发布系统 alloydist
7. [工程化集成] 通过 task 调用 alloydist 提供 rest 借口，轻松实现命令行部署测试环境、正式环境、离线包发布等

### 依赖
1. [ruby](https://www.ruby-lang.org/) & [compass](http://compass-style.org/)
2. [nodejs](http://nodejs.org/)
3. [gulp](https://github.com/gulpjs/gulp/) & [slush](https://github.com/slushjs/slush)

### 安装
* 安装 ruby，参考 https://www.ruby-lang.org/en/installation/
* 安装 compass
```shell
gem install compass
```
* 安装 nodejs，参考 http://nodejs.org/
* 安装 gulp slush slush-alloyteam-simple
```shell
npm install -g gulp slush slush-alloyteam-simple
```
* 创建项目目录
```shell
mkdir alloyteam-webapp
cd alloyteam-webapp
```
* 初始化项目
```shell
slush alloyteam-simple
```
* 安装依赖
```shell
npm install
```
* 启动开发任务
```shell
gulp
```
* 启动正常发布编译任务
```shell
gulp dist
```

