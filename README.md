# test_node

[![CircleCI](https://circleci.com/gh/SekiguchiKai/test_node.svg?style=svg&circle-token=f63e52af97cf652875c98ab5f404b5b64af88913)](https://circleci.com/gh/SekiguchiKai/test_node)

====

##Overview
test_node is the modified version of the JankenServer-Node.js-version-.
This is the application which enables people to play the Janken game online.

## Description
Player choices the his/her hands of rock-paper-scissors, and battale with the server which automatically choice it's hands of rock-paper-scissors.

## Requirement
* Node.js -6.7.0 <br>
http://nodejs.jp/nodejs.org_ja/docs/v0.10/

* ejs -2.5.2<br>
http://www.embeddedjs.com/

## Requirement (with test)
* mocha -3.1.2<br>
https://mochajs.org/

* chai -3.5.0<br>
http://chaijs.com/



## Usage
The usage of this application as follows.

1. Hit the command ```npm run start``` or ```npm start```.
   The application will start.
  
2. Visit the ```http://localhost:8080/``` on your browser, you can start JankenGame.

3. The fight screen is displayed, please choice the hands of rock-paper-scissors and click the botton "これで決定!".

4. After clicking the botton "これで決定!", you will see the result of the game in screen.

## Install
```git clone [this repository]``` and go in application root directory, hitting the command ```npm install```.

## specifications
-----------------

### webserver.js

#### 概念(責任)
* クライアントとサーバとのやりとりを行う
* 他の各機能を持ったファイルを呼び出す

#### 仕様
* クライアントからリクエストを受け取る
* クライアントからのリクエストを解析し、適切な処理を行う関数を呼び出す

#### 実装
* クライアントからリクエストを受け取る
     1. ```http://localhost:8080```でクライアントからのリクエストを待ち受ける

* クライアントからのリクエストを解析し、適切な処理を行う関数を呼び出す
     1. 受け取ったリクエストのパスを解析する
     2. 解析結果を元に、そのパスにバンドルされているハンドラ（関数）を呼び出す<br>
        →```"/"```の場合、responseGenerator.jsを呼び出す<br>
        →```"/calcProcess"```の場合、janken.js及び、ejsResponder.jsを呼び出す<br>


-----------------
### janken.js


#### 概念（責任）
* クライアントの打ち手とサーバの打ち手を比較して、じゃんけんの勝負の結果をwebserver.jsに返す

#### 機能
* webserver.jsから、クライアントの打ち手を受け取る
* サーバの打ち手を自動生成する
* クライアントの打ち手とサーバの打ち手を比較し、勝敗を決定する
* 勝敗の結果をwebserver.jsに返す

#### 実装
* webserver.jsから、クライアントの打ち手を受け取る
    1. ```”/calcProcess”```のリクエストハンドラとして登録しておいたjudgeResult関数がwebServer.jsから呼び出される
    2. その際ユーザーがブラウザ上で、選択したクライアントの打ち手をwebserver.jsから、引数として受け取る

* サーバの打ち手を自動生成する
    1. 0~2の擬似乱数を発生させて、それをサーバの打ち手とする

* クライアントの打ち手とサーバの打ち手を比較し、勝敗の結果を決定する
    1. クライアントからPOSTメソッドを通じて送信された数字と、乱数で発生させたサーバのサーバの数字とを比較する

* 勝敗の結果をwebserver.jsに返す
    1. オブジェクトを生成して、勝敗結果、クライアントの打ち手、サーバの打ち手の3つのプロパティを作る
    2. 各プロパティにそれぞれの結果を格納する
    3. プロパティが格納されたオブジェクトを戻り値としてwebServer.jsに返す


-------------------------
### responseGenerater.js


#### 概念(責任)
* クライアントに対して指定されたファイルを返す

#### 仕様
* webSever.jsから、呼び出される
* レスポンスに必要なHTMLファイルを読み込む
* 読み込んだファイルをクライアントにレスポンスする

#### 実装
* webSever.jsから、呼び出される
    1. 必要なファイル名とファイルの種類を引数に呼び出される
* 必要なファイルを読み込む
    1. 引数で与えられたHTMLファイルを読み込む
* 読み込んだファイルをHTTPのレスポンスとして返す
    1. HTTPヘッダにファイルの種類とステータスコードを記述する
    2. HTTPボディにファイルの中身を記述する



---------------------
### ejsResponder.js


#### 概念(責任)
* クライアントに対して指定されたejsテンプレートファイルを返す

#### 仕様
* webSever.jsから、呼び出される
* レスポンスに必要なejsテンプレートファイルを読み込む
* 読み込んだファイルをクライアントにレスポンスする

#### 実装
* webSever.jsから、janken.jsの戻り値を引数として呼び出される
    1. 必要なファイル名とファイルの種類を引数に呼び出される
* janken.jsのオブジェクトの中身をejsのテンプレートファイルに反映する
    1. 各タグ部分をオブジェクトの値に書き換える処理を行う
* 読み込んだファイルをHTTPのレスポンスとして返す
    1. HTTPヘッダにファイルの種類とステータスコードを記述する
    2. HTTPボディにファイルの中身を記述する







## Licence
[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)


