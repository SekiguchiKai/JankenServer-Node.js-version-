var fs = require('fs')
var sv = require("./server.js")
var main = require("./main.js")

    // ①index.htmlを読み込んで返す
exports.indexGenerator = function () {
    //"renderHTML"が呼び出されたことを確認するために
    console.log("「renderHTML」が呼び出されました")
        // HTML読み込み
    fs.readFile(__dirname + '/template/index.html', 'utf-8', function (err, data) {
        // エラー処理
        if (err) {
            // レスポンスヘッダを返す=>ステータスコード（e.g.200）みたいなやつ
            // 引数,1:ステータスコード、2::ステータスメッセージ
            sv.server.res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            // HTTPレスポンスボディを出力する
            sv.server.res.write("Sorry we can not find this file");
            return sv.server.res.end("access Error");
        }
        // 正常に接続された時のパターン
        sv.server.res.writeHead(200, {
            'content-Type': 'text/html'
        });
        sv.server.res.write(data);
        sv.server.res.end("HTML file has already sent to browser");
    });
}