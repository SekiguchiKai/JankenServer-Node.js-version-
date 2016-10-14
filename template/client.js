
/*//JSONをGetする
$.getJSON(
  "../main.js", //リクエストURL
  null,       //送信データ 
    
  //data：サーバから返るJSONオブジェクト,status：リクエスト結果を表す文字列
  function(data, status) {
    // 成功時の処理
    //htmlの値を変えたい
    var obj = $.parseJSON(data);  //e.g{"result":"君の勝ちだ!"}
    $("result").append($(obj.result));  //もしかしたら、<pのid>でこっちはdivかも
    $('#shouhai').show();
  }
);
*/


//クリックされたら、
$("#showResult").click(function () {
  //JSONをGetする
$.getJSON("webServer.js", function(json){
    var result = json.result;
//HTMLを書き換える

//ユーザーの打ち手を表示
$("submit").click(function () {
  $("#clientUchite").append($(uchiteForm.radio.value));
  $('#showClient').show();
  

//サーバ側の打ち手を表示
    $("#severUchite").append($(result));  //もしかしたら、<pのid>でこっちはdivかも
    $('#showServer').show();
    
    $("#result").append($(result));  //もしかしたら、<pのid>でこっちはdivかも
    $('#showResult').show();
 });    
 });   
});