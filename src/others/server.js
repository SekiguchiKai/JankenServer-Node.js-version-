var http = require('http');
var fs = require('fs')
var url = require('url');
var server = http.createServer();
var request = require('request');
var qs = require('querystring');
var path = require("path");
var ejs = require('ejs');
var jk = require("./janken.js")
var hg = require("./htmlGenerator.js")
var uri;
var a;
// クライアントの打ち手
var clientUchite;
// サーバの打ち手
var serverUchite;
// 勝負の結果
var result;
//http.createServerがrequestされたら、
exports.server =  
    server.on('request', function (req, res) {
        var req = req;
        var res = res;

        // urlのpathをuriに代入
        var uri = url.parse(req.url).pathname;
        // cwd()：カレントディレクトリ、uri：path
        var filename = path.join(process.cwd(), uri);
        a = "a";      
    });

exports.uri = function(){
    return a;
}


   


// 指定されたポート(8080)でコネクションの受け入れを開始する
//コールバック関数で、指定されたポート番号が正しいか判断
server.listen(8080)
console.log('Server running at http://localhost:8080/');
