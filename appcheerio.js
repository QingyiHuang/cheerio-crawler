var express = require('express');
var superagent = require('superagent')//http api
var cheerio = require('cheerio')//写爬虫
var app = express();

app.get('/', function (req, res, next) {
  // 用 superagent 去抓取 百思不得姐/ 的内容
  superagent.get('http://www.budejie.com/')
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var items = [];
      $('.bdsharebuttonbox').each(function (idx, element) {
        var $element = $(element);
        items.push({
          title: $element.attr('data-text'),
          href: $element.attr('data-pic')
        });
      });

      res.send(items);
    });
});

app.listen(3000,function(){
  console.log('baisibudejie is crawed')
});
