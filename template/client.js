$('#uchiteForm').submit(function () {

  //JSONをGetする
$.getJSON("/getresult", function(json){
    var result = json.result;
    $("#clientUchite").append($( json.result))
    
});

//HTMLを書き換える

//ユーザーの打ち手を表示
$("showResult").click(function () {
  $("#clientUchite").append($(uchiteForm.radio.value));
  $('#showClient').show();
  

//サーバ側の打ち手を表示
    $("#severUchite").append($(result));  //もしかしたら、<pのid>でこっちはdivかも
    $('#showServer').show();
    
    $("#result").append($(result));  //もしかしたら、<pのid>でこっちはdivかも
    $('#showResult').show();
 });    
 });   
