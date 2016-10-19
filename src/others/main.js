var sv = require('./server.js')
var jk = require('./janken.js')
var hG = require('./htmlGenerator.js')

function main() {
    sv.server();
    var uri = sv.uri();
    console.log(uri);
    
    // URIで行う処理を分岐させる
    if (uri === "/") {
        hG.indexGenerator();
        return;
    }
    else if (uri === "/calcprocess") {
        jk.janken();
        return;
    };
}