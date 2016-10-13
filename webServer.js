//webサーバを立てる
/*
作成するもの
 ①index.htmlから、httpでリクエストを受信する
 ②リクエストハンドラ起動(/の時)
 →index.htmlをパースする
 ③index.htmlからformの結果を受け取る
 ④リクエストハンドラの起動(/Result)
 →webApp.jsにリクエストを送信し、処理させる
 ⑤webApp.jsから処理結果を受け取る（データ）
 ⑥クライアントへ処理結果（データ）を送信する
 */
//webサーバを立てる
/*
作成するもの
 ①index.htmlから、httpでリクエストを受信する
 ②リクエストハンドラ起動(/の時)
 →index.htmlをパースする
 ③index.htmlからformの結果を受け取る
 ④リクエストハンドラの起動(/Result)
 →webApp.jsにリクエストを送信し、処理させる
 ⑤webApp.jsから処理結果を受け取る（データ）
 ⑥クライアントへ処理結果（データ）を送信する

 */



var http = require('http');
var fs = require('fs')
var url = require('url');
var server = http.createServer();
var request = require('request');
var qs = require('querystring');





    /*エラーの場合とそうでない時の条件を書く*/
server.on('request', function (req, res) {
    //非同期でファイルを読み込む
    fs.readFile(__dirname + '/template/index.html', 'utf-8', function(err, data){
        //エラー処理
        if (err) {
            //レスポンスヘッダを返す=>ステータスコード（e.g.200）みたいなやつ
            //引数,1:ステータスコード、2::ステータスメッセージ
            res.writeHead(404,{'Content-Type': 'text/plain'});
            // HTTPレスポンスボディを出力する
            res.write("Sorry we can not find this file");
            return res.end("access Error");
        }
        //正常に接続された時のパターン
        res.writeHead(200,{'content-Type': 'text/html'});
        res.write(data);
        //.
        res.end("HTML file has already sent to browser");
    });

    //クライアントからのリクエストの判断

if(req.method=='POST') {
           var body='';
           
           //dataにリクエストのボディが届く
           req.on('data', function (data) {
               body +=data;
           });
           req.on('end', function(){
               var formContents = qs.parse(body)

               console.log(formContents)//+ 'POSTのリクエストが届きました');
           })

           
};

if(req.method=='GET') {
           var body='';
           req.on('data', function (data) {
               body +=data;
           });

           console.log(body + 'GETのリクエストが届きました');
};






});
    
server.listen(8080); //指定されたポート(8080)でコネクションの受け入れを開始する
console.log('Server running at http://localhost:8080/'); //サーバが正常に起動していることを確認するため

