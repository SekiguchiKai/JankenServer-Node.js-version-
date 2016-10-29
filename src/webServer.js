// クライアントからのレスポンスを受け取り、適切なファイルに処理を依頼する

var http = require('http');
var url = require('url');
var server = http.createServer();
var qs = require('querystring');
var path = require("path");

// janken.jsを呼び出すためにrequire
var jk = require("./janken.js");
// responseGenerater.jsを呼び出すためにrequire
var rG = require("./responseGenerater.js");
// ejsResponder.jsを呼び出すためにrequire
var ejR = require("./ejsResponder.js");


// http.createServerがrequestされたら、
exports.webserver = server.on('request', function (req, res) {

    // Responseオブジェクトを作成し、その中に必要な処理を書いていき、条件によって対応させる
    var Response = {
        "renderHTML": function () {
            rG.responseGenerator(res, './template/index.html', 'text/html'); // res, resource, content_Type
            return
        },
        "calcProcess": function () {
            var body = '';
            // dataにリクエストのボディが届く
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                var formContents = qs.parse(body)
                // オブジェクトの値（ここでいうpostの値を取り出す）
                var postContent = parseInt(formContents.C_uchite)
                console.log('POSTのリクエストが届きました、POSTの値は「' + postContent + '」です。');


                // judgeResultの戻り値（result, clientUchite, serverUchite)を全て格納するオブジェクトを格納するオブジェクトを宣言
                var allResultObj = jk.judgeResult(postContent);

                console.log("jk.judgeResultの戻り値のオブジェクトは" + toString(allResultObj));

                // responseGenerater.jsにじゃんけんの結果を渡して、結果を反映させたHTMLを返してもらう
                ejR.ejsResponder(res, './template/result.ejs', 'text/html', allResultObj)

            });


        }
    }

    // urlのpathをuriに代入
    var uri = url.parse(req.url).pathname;


    // URIで行う処理を分岐させる
    if (uri === "/") {
        Response["renderHTML"]();
        return;
    } else if (uri === "/calcprocess") {
        Response["calcProcess"]();
        return;
    }
});

// 指定されたポート(8080)でコネクションの受け入れを開始する
server.listen(8080)
console.log('Server running at http://localhost:8080/');
