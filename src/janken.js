require 



// 通常は、sに引数を与えない。テストの場合のみ与える
exports.janken = function janken(c, s) {

    // クライアントの打ち手を代入    
    clientUchite = c;

    
    // サーバ側の打ち手を決める
    // 乱数を発生させる
    serverUchite = Math.floor(Math.random() * (2 - 0 + 1)) + 0;

// テスト用の確認
    if (s != null) {
        serverUchite = s;
    }



    // アルゴリズム
    if ((clientUchite === 0 && serverUchite === 1) || (clientUchite === 1 && serverUchite === 2) || (clientUchite === 2 && serverUchite === 0)) {
        result = "君の勝ちだ！";
    }
    else if ((clientUchite === 1 && serverUchite === 0) || (clientUchite === 2 && serverUchite === 1) || (clientUchite === 0 && serverUchite === 2)) {
        result = "君の負けだ！";
    }
    else if (clientUchite === serverUchite) {
        result = "引き分けだ！";
    }

    return result;
}

