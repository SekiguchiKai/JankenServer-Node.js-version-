var http = require('http');
var fs = require('fs')
var url = require('url');
var server = http.createServer();
var request = require('request');
var qs = require('querystring');
var path = require("path");
var ejs = require('ejs');
// クライアントの打ち手
var clientUchite;
// サーバの打ち手
var serverUchite;
// 勝負の結果
var result;
// http.createServerがrequestされたら、
server.on('request', function (req, res) {
    // Responseオブジェクトを作成し、その中に必要な処理を書いていき、条件によって対応させる
    var Response = {
        // ①HTMLを返す
        "renderHTML": function (file, filename) {
            //"renderHTML"が呼び出されたことを確認するために
            console.log("「renderHTML」が呼び出されました")

            // HTML読み込み
            fs.readFile(__dirname + '/template/index.html', 'utf-8', function (err, data) {
                // エラー処理
                if (err) {
                    // レスポンスヘッダを返す=>ステータスコード（e.g.200）みたいなやつ
                    // 引数,1:ステータスコード、2::ステータスメッセージ
                    res.writeHead(404, {
                        'Content-Type': 'text/plain'
                    });
                    // HTTPレスポンスボディを出力する
                    res.write("Sorry we can not find this file");
                    return res.end("access Error");
                }
                // 正常に接続された時のパターン
                res.writeHead(200, {
                    'content-Type': 'text/html'
                });
                res.write(data);
                res.end("HTML file has already sent to browser");
            });
        }, // ②クライアントからのPOSTリクエストを処理する
        "calcProcess": function (file, filename) {

            //"calcProcess"が呼び出されたことを確認するために
            console.log("「calcProcess」が呼び出されました")

            var body = '';
            // dataにリクエストのボディが届く
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                var formContents = qs.parse(body)
                // オブジェクトの値（ここでいうpostの値を取り出す）
                var stContents = parseInt(formContents.C_uchite)
                console.log(stContents + 'POSTのリクエストが届きました');

                //ここで、じゃんけんアルゴリズムを実装
                /*
                ・グー=0
                ・チョキ-1
                ・パー=2
                */

                // クライアントの打ち手を代入    
                clientUchite = stContents;
                // サーバ側の打ち手を決める
                // 乱数を発生させる
                serverUchite = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
                // アルゴリズム
                if ((clientUchite == 0 && serverUchite === 1) || (clientUchite === 1 && serverUchite === 2) || (clientUchite === 2 && serverUchite === 0)) {
                    result = "君の勝ちだ！";
                }
                else if ((clientUchite === 1 && serverUchite === 0) || (clientUchite === 2 && serverUchite === 1) || (clientUchite === 0 && serverUchite === 2)) {
                    result = "君の負けだ！";
                }
                else if (clientUchite === serverUchite) {
                    result = "引き分けだ！";
                }

                // 表示のための処理
                // クライアント
                switch (clientUchite) {
                    case 0:
                        clientUchite = "グー"
                        break;
                    case 1:
                        clientUchite = "チョキ"
                        break;
                    case 2:
                        clientUchite = "パー"
                        break;
                }

                // 表示のための処理
                // サーバ
                switch (serverUchite) {
                    case 0:
                        serverUchite = "グー"
                        break;
                    case 1:
                        serverUchite = "チョキ"
                        break;
                    case 2:
                        serverUchite = "パー"
                        break;
                }




                // 結果の呼び込み
                var template = fs.readFileSync(__dirname + '/template/result.ejs', 'utf-8');
                var data = ejs.render(template, {
                    clientUchite: clientUchite
                    , serverUchite: serverUchite
                    , result: result
                });
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write(data);
                res.end();
            });
        }
    }
    // Response
    // URIで行う処理を分岐させる
    // urlのpathをuriに代入
    var uri = url.parse(req.url).pathname;
    // cwd()：カレントディレクトリ、uri：path
    var filename = path.join(process.cwd(), uri);


    if (uri === "/") {
        Response["renderHTML"]();
        return;
    } else if (uri === "/calcprocess") {
        Response["calcProcess"]();
        return;
    }

});

// 指定されたポート(8080)でコネクションの受け入れを開始する
//コールバック関数で、指定されたポート番号が正しいか判断

server.listen(8080)
console.log('Server running at http://localhost:8080/');







