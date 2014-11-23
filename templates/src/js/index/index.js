require('../common/global.js');
require('../common/config.js');
var $ = require('jQuery');

var list = require('../../tpl/index/list.hbs');

var data = {
    body: 'this is body',
    title: 'hi title'
};
var dom = list(data);
document.write(dom);

console.log('test!!');
console.log('index loaded');
