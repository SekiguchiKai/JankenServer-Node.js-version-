// じゃんけんのアルゴリズム部分（勝敗を決定してresultを返す）
/* c = クライアントの打ち手、 s = サーバの打ち手（デフォルト値）
   cは、クライアントから送られてくる、sは、デフォルト値を使うこととし、テストの場合のみ変数を与える
*/


const Uchite_GU = 0;
const Uchite_TYOKI = 1;
const Uchite_PA = 2;


// クライアントとサーバのじゃんけんの結果を判定する関数 // 乱数を別に　この関数から呼び出す
exports.judgeResult = function judgeResult(c, s = Math.floor(Math.random() * (2 - 0 + 1)) + 0) {

    // 確認用
    console.log("janken.jsrが呼び出されました。レスポンスのための資源を生成します");

    // クライアントの打ち手に引数を代入
    var clientUchite = c;

    // サーバの打ち手を代入に引数を代入
    var serverUchite = s;

    // じゃんけんの結果を格納する変数を宣言
    var result;

    // アルゴリズム
    if ((clientUchite === Uchite_GU && serverUchite === Uchite_TYOKI) || (clientUchite === Uchite_TYOKI && serverUchite === Uchite_PA) || (clientUchite === Uchite_PA && serverUchite === Uchite_GU)) {
        result = "君の勝ちだ！";
    }
    else if ((clientUchite === Uchite_TYOKI && serverUchite === Uchite_GU) || (clientUchite === Uchite_PA && serverUchite === Uchite_TYOKI) || (clientUchite === Uchite_GU && serverUchite === Uchite_PA)) {
        result = "君の負けだ！";
    }
    else if (clientUchite === serverUchite) {
        result = "引き分けだ！";
    }

    // 表示のための処理
                // クライアント
                switch (clientUchite) {
                    case Uchite_GU:
                        clientUchite = "グー"
                        break;
                    case Uchite_TYOKI:
                        clientUchite = "チョキ"
                        break;
                    case Uchite_PA:
                        clientUchite = "パー"
                        break;
                }

                // 表示のための処理
                // サーバ
                switch (serverUchite) {
                    case Uchite_GU:
                        serverUchite = "グー"
                        break;
                    case Uchite_TYOKI:
                        serverUchite = "チョキ"
                        break;
                    case Uchite_PA:
                        serverUchite = "パー"
                        break;
                }
    // オブジェクトとして各値を返す
    var allResultObj= {};
    // オブジェクトの各プロパティに値を追加
    allResultObj.result = result;
    allResultObj.clientUchite = clientUchite;
    allResultObj.serverUchite = serverUchite;
    return allResultObj;
}







