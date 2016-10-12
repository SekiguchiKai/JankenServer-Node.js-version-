//じゃんけんのアルゴリズムを実装

/*
・グー=0
・チョキ-1
・パー=2


 */
    
    //formで送られてきた値を引数にする予定
//現時点では1（チョキで実装）


var clientUchite = 1;
        
        //サーバ側の打ち手を決める
        //乱数を発生させる
    var serverUchite = Math.floor( Math.random() * (2 - 0 + 1) ) + 0;
        
        //アルゴリズム
    if ((clientUchite == 0 && serverUchite === 1) || (clientUchite === 1 && serverUchite === 2) || (clientUchite === 2 && serverUchite === 0)) {
         console.log("君の勝ちだ！")
    } else if ((clientUchite === 1 && serverUchite === 0) || (clientUchite === 2 && serverUchite === 1) || (clientUchite === 0 && serverUchite === 2)){
        console.log("君の負けだ！");
    } else if (clientUchite === serverUchite) {
        console.log("引き分けだ！");
    } else {
        console.log("以上！");
    }
