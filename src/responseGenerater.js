// HTMLなどのレスポンス資源を生成し、クライアントにレスポンスを返す

var fs = require('fs');
var ejs = require('ejs');
var webserver = require("./webServer.js");

// レスポンスのための資源を生成し、クライアントに返す // 引数の例(res'../template/index.html','text/html')
exports.responseGenerator = function responseGenerator(res, resource, content_Type) {

    console.log("generateResourceが呼び出されました。レスポンスのための資源を生成します");

    // HTML読み込み =>読み込まれたら、コールバックでレスポンスまで行う
    var template = fs.readFile(resource, 'utf-8', function (err, data) {
        console.log("resourceは" + resource);


        // エラー処理
        if (err) {
            // レスポンスヘッダを返す=>ステータスコード（e.g.200）みたいなやつ
            // 引数,1:ステータスコード、2::ステータスメッセージ
            // HTTPレスポンスヘッダを出力する
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            // HTTPレスポンスボディを出力する
            res.write("Sorry we can not find this file");
            return res.end("access Error");
        } else {
            // 正常に接続された時のパターン
            // HTTPレスポンスヘッダを出力する
            res.writeHead(200, {
                'content-Type': content_Type      // 'text/html'などを期待
            });

            // HTTPレスポンスボディを出力する
            res.write(data);
            res.end("HTML file has already sent to browser");
        };

    });

}; 