var http = require('http');
var fs = require('fs')
var url = require('url');
var server = http.createServer();
var request = require('request');
var qs = require('querystring');
var path = require("path");
var resultJson = "";
var resultJson;
 //オブジェクト作成 クライアント、サーバの打ち手、勝負の結果を入れる
var objResult = {};
//
server.on('request', function (req, res) {
    //Responseオブジェクトを作成し、その中に必要な処理を書いていき、条件によって対応させる
    var Response = {
        //①HTMLを返す
        "renderHTML": function (file, filename) {
                //HTML読み込み
                fs.readFile(__dirname + '/template/index.html', 'utf-8', function (err, data) {
                    //エラー処理
                    if (err) {
                        //レスポンスヘッダを返す=>ステータスコード（e.g.200）みたいなやつ
                        //引数,1:ステータスコード、2::ステータスメッセージ
                        res.writeHead(404, {
                            'Content-Type': 'text/plain'
                        });
                        // HTTPレスポンスボディを出力する
                        res.write("Sorry we can not find this file");
                        return res.end("access Error");
                    }
                    //正常に接続された時のパターン
                    res.writeHead(200, {
                        'content-Type': 'text/html'
                    });
                    res.write(data);
                    //.
                    res.end("HTML file has already sent to browser");
                });
            },
            //②クライアントからのPOSTリクエストを処理する(じゃんけんの結果決定->JSON生成)
        "calcProcess": function (file, filename) {
                var body = '';
                //dataにリクエストのボディが届く
                req.on('data', function (data) {
                    body += data;
                });
                req.on('end', function () {
                    var formContents = qs.parse(body)
                        //オブジェクトの値（ここでいうpostの値を取り出す）
                    var stContents = parseInt(formContents.C_uchite)
                    console.log(stContents) //+ 'POSTのリクエストが届きました');
                        //ここで、じゃんけんアルゴリズムを実装
                        /*
                        ・グー=0
                        ・チョキ-1
                        ・パー=2
                        */
                    var clientUchite = stContents;
                    //サーバ側の打ち手を決める
                    //乱数を発生させる
                    var serverUchite = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
                    //アルゴリズム
                   

                    //オブジェクトにserverUchiteを追加
                    objResult.obj_serverUchite = serverUchite;
                    //オブジェクトにserverUchiteを追加
                    objResult.obj_clientUchite = clientUchite;


                    if ((clientUchite == 0 && serverUchite === 1) || (clientUchite === 1 && serverUchite === 2) || (clientUchite === 2 && serverUchite === 0)) {
                        objResult.result = "君の勝ちだ！";
                    }
                    else if ((clientUchite === 1 && serverUchite === 0) || (clientUchite === 2 && serverUchite === 1) || (clientUchite === 0 && serverUchite === 2)) {
                        objResult.result = "君の負けだ！";
                    }
                    else if (clientUchite === serverUchite) {
                        objResult.result = "引き分けだ！";
                    }
                    //実験で
                    console.log(objResult);
                    //JSONを作成する       
                    resultJson = JSON.stringify(objResult);
                    console.log(resultJson);

                });
            },
            //③クライアントからのGETリクエストを処理する(JSONを返す)
        "getResult": function (file, filename) {
            //getでJSONを返す
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end(resultJson);
        }
    }
    
    //URIで行う処理を分岐させる
    //urlのpathをuriに代入
    var uri = url.parse(req.url).pathname;
    //cwd()：カレントディレクトリ、uri：path
    var　filename = path.join(process.cwd(), uri);

    if(uri == "/"){
        Response["renderHTML"](); return;
    }else if(uri == "/calcprocess"){
        Response["calcProcess"](); return;
    }else if(uri == "/getResult"){
        Response["getResult"](); return;
    }
    
});

server.listen(8080); //指定されたポート(8080)でコネクションの受け入れを開始する
console.log('Server running at http://localhost:8080/renderhtml'); //サーバが正常に起動していることを確認するため

//http://localhost:8080/renderhtmlにする