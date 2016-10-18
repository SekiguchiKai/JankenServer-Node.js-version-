// webServer.jsのテストをBDDで行う

// assertアサーションを利用できるようにする
var chai = require('chai');
var assert = chai.assert;


// webServer.jsをmoduleとして使用するために
var jk = require('../src/janken.js');


// describe()は、複数のテストケースをまとめるためのもの
describe('じゃんけんアルゴリズム', function () {

    it('「クライアント:グー、サーバ:チョキ」の場合は、クライアントの勝ち', function () {
        assert.equal(jk.janken(0, 1), ("君の勝ちだ！", "グー", "チョキ"));
    });

    it('クライアント:チョキ、サーバ:パー」の場合は、クライアントの勝ち', function () {
        assert.equal(jk.janken(1, 2), ("君の勝ちだ！", "チョキ", "パー"));
    });

    it('クライアント:パー、サーバ:グー」の場合は、クライアントの勝ち', function () {
        assert.equal(jk.janken(2, 0), ("君の勝ちだ！", "パー", "グー"));
    });

    it('クライアント:チョキ、サーバ:グー」の場合は、サーバの勝ち', function () {
        assert.equal(jk.janken(1, 0), ("君の負けだ！", "チョキ", "グー"));
    });

    it('クライアント:パー、サーバ:チョキ」の場合は、サーバの勝ち', function () {
        assert.equal(jk.janken(2, 1), ("君の負けだ！", "パー", "チョキ"));
    });

    it('クライアント:グー、サーバ:パー」の場合は、サーバの勝ち', function () {
        assert.equal(jk.janken(0, 2), ("君の負けだ！", "グー",　"パー"));
    });

    it('クライアント:グー、サーバ:グー」の場合は、引き分け', function () {
        assert.equal(jk.janken(0, 0), ("renderHTML", "グー", "グー") );
    });

    it('クライアント:チョキ、サーバ:チョキ」の場合は、引き分け', function () {
        assert.equal(jk.janken(1, 1), ("renderHTML", "チョキ", "チョキ"));
    });

    it('クライアント:パー、サーバ:パー」の場合は、引き分け', function () {
        assert.equal(jk.janken(2, 2), ("renderHTML", "パー", "パー"));
    });

});