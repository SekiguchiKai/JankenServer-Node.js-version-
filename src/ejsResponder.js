
// HTMLなどのレスポンス資源を生成し、クライアントにレスポンスを返す

var fs = require('fs');
var ejs = require('ejs');
var webserver = require("./webServer.js");

// レスポンスのための資源を生成し、クライアントに返す // 引数の例(res'../template/index.html','text/html')
exports.ejsResponder = function ejsResponder(res, resource, Content_Type, allResultObj) {

    console.log("ejsResponderが呼び出されました。レスポンスのための資源を生成します");

    // HTML読み込み =>読み込まれたら、コールバックでレスポンスまで行う
    var template = fs.readFileSync(resource, 'utf-8');
    var data = ejs.render(template, {
        result: allResultObj.result,
        clientUchite: allResultObj.clientUchite,
        serverUchite: allResultObj.serverUchite
    });
    res.writeHead(200, {
        'Content-Type': Content_Type
    });
    res.write(data);
    res.end();
};