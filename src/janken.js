

exports.janken = function janken(c, s) {

    // クライアントの打ち手を代入    
    clientUchite = c;
    // サーバ側の打ち手を決める
    // 乱数を発生させる

    //serverUchite = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
    serverUchite = s;

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
    return result, clientUchite, serverUchite;
}

