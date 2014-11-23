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
3. [js] 支持多种模块化策略，使用 webpack 进行 cmd/amd 模块化打包
4. [js] 内置 handlebar 模板引擎支持，发布前编译
5. [html] 自动替换 html 内部资源引用路径，替换为 cdn/md5 版本化路径
6. [html] 轻松支持 js/css 资源内嵌到页面
7. [工程化集成] 生成资源（ak离线包、web资源），对接内部发布系统 jb.oa.com
7. [工程化集成] 通过 task 调用 jb.oa.com 提供 rest api 接口，轻松实现命令行部署测试环境、正式环境、离线包发布等

### 依赖
1. [ruby](https://www.ruby-lang.org/) & [compass](http://compass-style.org/)
2. [nodejs](http://nodejs.org/)
3. [gulp](https://github.com/gulpjs/gulp/) & [slush](https://github.com/slushjs/slush)

### 安装
* 安装 ruby，参考 https://www.ruby-lang.org/en/installation/
* 建议安装 compass preview 版本
```shell
gem install compass --pre
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
* 按照提示填写项目初始化信息
```shell
项目名称，如：alloyteam-webapp
项目html路径，如：http://find.qq.com/qqun/search/
项目cdn路径，如：http://s.url.cn/qqun/qqfind/search/
子项目(可留空)，如：qiqi_1111
```
* [可选] 确定 jb.oa.com 是否有对应部署映射，多个子项目的映射可以公用，如各种运营活动，activity/qiqi_1111
```shell
项目路径 与 jb 映射对应关系
http://find.qq.com/qqun/search/  <=> /data/sites/find.qq.com/qqun/search/ 
http://s.url.cn/qqun/qqfind/search/  <=> /data/sites/cdn.qplus.com/qqun/search/
```
* 安装构建依赖
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

### 目录约定
* 根目录
```shell
./alloyteam-simple-app/
├── README.md
├── config.rb  -- sass 配置文件，不需修改
├── dist  -- 开发编译目录，开发时将资源替换到这里
├── gulpfile.js  -- gulp 构建文件，不需修改，版本升级，只需下载最新覆盖
├── node_modules
├── package.json
├── project.js -- 全局配置
├── src   -- 源代码目录
└── userdef.js  -- jb.oa.com 发布系统集成配置文件
```
* 源代码目录
```shell
./src
├── css  -- sass 样式目录，不需要编译生成 .css 文件的子模块，请使用 _ 开头
│   ├── common   -- 公共样式
│   │   ├── _level.scss  -- 自动 sprite 合并图片示范
│   │   ├── _reset.scss  -- reset css 公共模块
│   │   └── _ricons.scss  -- retina 高清 sprite 合并图片示范
│   ├── index  -- index 页面样式子模块，可以将 index 所需样式进行子模块划分，便于管理
│   │   └── _index.scss
│   └── index.scss  -- index 样式，合并所有 index 页面样式子模块，公共模块，合图...
├── favicon.ico
├── img  -- 图片目录
│   ├── common  -- 不需合图的图片，文件会自动在文件名加上md5，filename-md5.png
│   │   ├── banner.png  -- 自动生成 banner-be70f3b1.png
│   ├── sprite  -- 需要合图的图片，安装生成 sprite 图片名进行目录划分，可以自己新建子目录
│   │   ├── icons  -- 普清图，最终合并生成 icons-sbb41937c32.png
│   │   ├── icons@2x -- 2x高清图，生成 icons@2x-sb721890e87.png
│   │   └── level -- 普清图，生成 level-s99b1a493c7.png
│   └── static  -- 不需合图的图片，不需自动md5重命名的图片
│       ├── static-img-url.png
├── index.html  -- 首页
├── js  -- js 目录，使用 cmd require 规范进行模块之间应用
│   ├── common -- 公共模块
│   │   ├── config.js
│   │   └── global.js
│   ├── index  -- 首页 js 模块
│   │   └── index.js
│   └── libs  -- 第三方 js 库，会被复制到 dist 目录，js/css 文件名 md5 化
│       └── jquery
├── libs  -- 第三方库，libs 所有文件会被复制到 dist 目录，js/css 文件名 md5 化
│   └── bootstrap
│       ├── bootstrap.css
│       └── bootstrap.js
└── tpl  -- handlebar 模板文件
    ├── common  -- 公共模板页面片
    │   ├── footer.hbs
    │   └── header.hbs
    └── index  -- 首页模板
        └── list.hbs
```

### 如何新建一个页面，如下：mypage 为需要创建的页面名称
```
slush alloyteam-simple:page mypage
```
将会生成如下目录和文件
```
./src
├── mypage.html 
├── css
│   ├── mypage
│   │   └── _index.scss
│   └── mypage.scss
├── js
│   ├── mypage
│   │   └── index.js
├── tpl
│   ├── mypage
│   │   └── index.hbs
```
修改 project.js 中的 webpack entry 项目，添加对应的 js 编译项
```
entry: {
    index: './src/js/index/index.js',
    mypage: './src/js/mypage/index.js'
},
```

### 如何新建一个 sprite 自动合图，如下：mysprite 为需要创建的 sprite 名称
```
# 生成精灵图，方式一：自动生成合图样式，参考下面【关于 css】说明
slush alloyteam-simple:autosprite mysprite
# 生成精灵图，方式二：使用 include 引用合图样式
slush alloyteam-simple:sprite mysprite
# 生成高清精灵图
slush alloyteam-simple:retina mysprite
```
将会生成如下目录和文件
```
./src
├── css
│   ├── common
│   │   └── _mysprite.scss
├── img
│   ├── mysprite
```


#### 如何开始编码
启动开发命令
```shell
gulp dev
```

#### 关于 css
* 使用 sass 进行 css 编写，有利于模块化，可复用
* 利用 compass 提供了便捷的自动合图，只支持 png

##### 如何进行自动合图，方式一：自动生成合图样式
* 在 src/img/sprite 下新建目录，名称为 sprite 名称，如QQ等级，level
* 将需要合图的图片放到 img/sprite/level 下，如 search.png 和 webqq.png
* 在 src/css/common 下新建文件，_level.scss (ps: 将文件内容中 level 替换为自己的 sprite 名称)
```
$level-layout:smart;
@import"sprite/level/*.png";
@include all-level-sprites;
```
上面的代码将自动生成如下代码
```
.level-search, .level-sprite, .level-webqq {
    background-image: url(../img/sprite/level-s99b1a493c7.png);
    background-repeat: no-repeat
}
.level-search {
    background-position: 0 0
}
.level-webqq {
    background-position: 0 -24px
}
```
* 将对应的 css 样式规则加在 html 页面或 hbs 模板中
```
<span class='level-search'></span>
```

##### 如何进行自动合图，方式二：使用 include 引用合图样式
* 在 src/img/sprite 下新建目录，名称为 sprite 名称，如QQ等级，level
* 将需要合图的图片放到 img/sprite/level 下，如 search.png 和 webqq.png
* 在 src/css/common 下新建文件，_level.scss (ps: 将文件内容中 level 替换为自己的 sprite 名称)
```
$level-layout:smart;
@import"sprite/level/*.png";
```
* 在需要引用小图标的地方，使用 @include {合图名称}-sprite("图标名称") 的方式引用
```
@import"common/level";
.hello {
    &:before {
        @include level-sprite("search");
    }
}
```
上面的代码将自动生成如下代码
```
.hello:before {
    background-image: url(../img/sprite/level-s99b1a493c7.png);
    background-repeat: no-repeat
}
.hello:before {
    background-position: 0 0
}
```

##### 如何让合图支持 retina 高清屏
* 大致过程参考上文 【如何进行自动合图，方式二】
* 在 src/img/sprite 下新建目录，名称为 sprite 名称，如QQ等级，level
* 分别在 src/img/sprite/level，src/img/sprite/level@2x 下面放普通图标和2x高清图
* 在 src/css/common 下新建文件，_level.scss (ps: 将文件内容中 level 替换为自己的 sprite 名称)
```
$level:sprite-map("sprite/level/*.png", $layout:smart);
$level-2x:sprite-map("sprite/level@2x/*.png", $layout:smart);
@mixin level-sprite-retina($sprite) {
    background-image: sprite-url($level);
    background-position: sprite-position($level, $sprite);
    background-repeat: no-repeat;
    overflow: hidden;
    display: block;
    height: image-height(sprite-file($level, $sprite));
    width: image-width(sprite-file($level, $sprite));
    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        background-image: sprite-url($level-2x);
        background-size: (image-width(sprite-path($level-2x)) / 2) (image-height(sprite-path($level-2x)) / 2);
        background-position: round(nth(sprite-position($level-2x, $sprite), 1) / 2) round(nth(sprite-position($level-2x, $sprite), 2) / 2);
        height: image-height(sprite-file($level-2x, $sprite)) / 2;
        width: image-width(sprite-file($level-2x, $sprite)) / 2;
    }
}
```
* 在需要引用小图标的地方，使用 @include {合图名称}-retina-sprite("图标名称") 的方式引用
```
@import"common/level";
.hello {
    &:before {
        @include level-retina-sprite("search");
    }
}
```

#### 关于 js
* 利用 webpack 进行 cmd 模块打包
* 在 js 中直接使用 require 即可，全部使用相对路径
```
// ./src/js/index/index.js
require('../common/global.js');
require('../common/config.js');
console.log('index is loaded');
```
* 在 js 中引用 handlebar 模板文件
```
// ./src/js/index/index.js
var listTpl = require('../../tpl/index/list.hbs');
var data = {
    body: 'this is body',
    title: 'hi title'
};
var dom = listTpl(data);
```
* 在 js 中引用 src/img/common 下图片
```
var banner = require('../../img/common/banner.png');
// will change to: "http://s.url.cn/qqun/img/common/banner-be70f3b1.png"
```

* 在 js 中引用 src/img/static 下图片
```
var staticImg = require('../../img/static/static-img-url.png');
// will change to: "http://s.url.cn/qqun/img/static/static-img-url.png"
```

* 在 js 中引用第三方库，如 jQuery
修改 project.js 配置，在 webpack 配置中添加 jQuery: "jQuery" (window.jQuery 可访问，其他库类似)
```
externals: {
    jQuery: "jQuery"
}
```
在 js 中直接添加引用
```
var jQuery = require('jQuery');
```
在 html 中添加 jquery 引用
```
<script src="js/libs/jquery/jquery.js"></script>
```

* 独立打包公共库，共享代码，避免不同页面 js 重复打包
修改 project.js 配置，添加公共库入口 common
```
entry: {
    commons: './src/js/common/index.js',
    index: './src/js/index/index.js',
    mypage: './src/js/mypage/index.js'
},
```
在 common/index.js 中暴露一个全局变量 window.commons 
```
// src/js/common/index.js
window.commons = {
    sub1: require('./sub1.js'),
    sub2: require('./sub2.js')
};
```
按照第三方类库的方式，引入 commons
```
externals: {
    commons: "commons"
}
```
在 js 中直接添加引用
```
var commons = require('commons');
```
在 html 中添加 commons 引用
```
<script src="js/commons.js"></script>
<script src="js/mypage.js"></script>
```

* 异步远程加载 js
待续

### 关于 handlebar 模板文件
* 语法参考: http://handlebarsjs.com/  
* https://github.com/altano/handlebars-loader

### 关于 html 文件


### 关于 liveproxy 开发代理
待续
