import chai from 'chai';
import {expect} from 'chai';
import sinon from 'sinon';
import Messages from "../src/messages";

// 配列で受け取った文字列内の余分なスペースを取り除く 
describe("strippedMessages", function(){
  it("文字列の配列を送り文字列の配列で受け取る", function(){
    sinon.stub(Messages, "hasTag").returns(false);
    expect(Messages.strippedMessages(["test"])).to.have.lengthOf(1);
    Messages.hasTag.restore();
  })
  it("文字列内の空白を削除している", function(){
    sinon.stub(Messages, "hasTag").returns(false);
    expect(Messages.strippedMessages(["last ", " first", " a l l "])).to.include.members(["last", "first", 'all']);
    Messages.hasTag.restore();
  })
  it("ただしハッシュタグ行の時は処理しない", function(){
    sinon.stub(Messages, "hasTag").returns(true);
    expect(Messages.strippedMessages(["ハッシュタグ test "])).to.include.members(["ハッシュタグ test "]);
    Messages.hasTag.restore();
  })

})

// 文字列末尾に句点を加える ただしハッシュタグ行及び 末尾が!や?の時はくわえない  
describe("addPeriod", function(){
  it("文字列の配列を送り文字列の配列で受け取る", function(){
    sinon.stub(Messages, "hasTag").returns(false);
    expect(Messages.addPeriod(["test"])).to.have.lengthOf(1);
    Messages.hasTag.restore();
  })
  it("すべての文字列末尾に句点を加える", function(){
    sinon.stub(Messages, "hasTag").returns(false);
    expect(Messages.addPeriod(["first", "last"])).to.include.members(["first。", "last。"]);
    Messages.hasTag.restore();
  })
  it("末尾が!や?の時はくわえない", function(){
    sinon.stub(Messages, "hasTag").returns(false);
    expect(Messages.addPeriod(["bikkuri!", " hatena?"])).to.include.members(["bikkuri!", " hatena?"]);
    Messages.hasTag.restore();
  })
  it("ただしハッシュタグ行の時は処理しない", function(){
    sinon.stub(Messages, "hasTag").returns(true);
    expect(Messages.addPeriod(["ハッシュタグ test "])).to.include.members(["ハッシュタグ test "]);
    Messages.hasTag.restore();
  })
})

// 配列で受け取った文字列を140文字を超えないように結合していく 
// ツイートが極力無駄のないように結合するがハッシュタグが別のツイートに分断されることはある 
describe("joinMessages", function(){
  it("文字列の配列を送り文字列の配列で受け取る", function(){
    expect(Messages.joinMessages(["te", "st"])).to.have.lengthOf(1);
  })
  it("文字列を結合している", function(){
    expect(Messages.joinMessages(["abc", "def"])).to.include.members(["abcdef"]);
  })
  it("140文字まで結合する", function(){
    var a70 = "*".repeat(70);
    var b70 = "-".repeat(70);
    expect(Messages.joinMessages([a70, b70])).to.have.lengthOf(1);
  })
  it("140文字を超えたところで結合を打ち切っている", function(){
    var a70 = "*".repeat(70);
    var b70 = "-".repeat(70);
    expect(Messages.joinMessages([a70, b70, "."])).to.have.lengthOf(2);
  })
  it("140文字を超えて結合を打ち切った時最初のメッセージが正しいか", function(){
    var a70 = "*".repeat(70);
    var b70 = "-".repeat(70);
    expect(Messages.joinMessages([a70, b70, "."])[0]).to.have.not.string('.');
  })
  it("140文字を超えて結合を打ち切った時2番目のメッセージが正しいか", function(){
    var a70 = "*".repeat(70);
    var b70 = "-".repeat(70);
    expect(Messages.joinMessages([a70, b70, "."])[1]).to.equal('.');
  })

})

// ハッシュタグチェック  
describe("hasTag", function(){
  it("ハッシュタグ行ならタグを配列で返す", function(){
    expect(Messages.hasTag("ハッシュタグ test")).to.have.lengthOf(1);
  })
  it("ハッシュタグはトリミングされる", function(){
    expect(Messages.hasTag("ハッシュタグ test ")).to.include.members(["test"]);
  })
  it("ハッシュタグ行でなければfalseを返す", function(){
    expect(Messages.hasTag("test")).to.be.false;
  })
  it("ハッシュタグはスペースで分割すれば複数を列挙できる", function(){
    expect(Messages.hasTag("ハッシュタグ 1st 2nd")).to.include.members(["1st", "2nd"]);
  })

})

  // メッセージ配列を受け取り各行がハッシュタグ行ならすべてのタグに#をつけてメッセージ配列で返す 
  describe("replaceTag", function(){
  it("タグが含まれているならタグに#をつける", function(){
    sinon.stub(Messages, 'hasTag').returns(['test']);
    expect(Messages.replaceTag(["ハッシュタグ test"])[0]).to.equal('#test');
    Messages.hasTag.restore();
  })
  it("タグにはすべて#をつける", function(){
    sinon.stub(Messages, 'hasTag').returns(['1st', '2nd']);
    expect(Messages.replaceTag(["ハッシュタグ 1st 2nd"])[0]).to.equal('#1st\n#2nd');
    Messages.hasTag.restore();
  })
  it("ハッシュタグ行でなければ加工せずに返す", function(){
    sinon.stub(Messages, 'hasTag').returns(false);
    expect(Messages.replaceTag(["test"])[0]).to.equal('test');
    Messages.hasTag.restore();
  })

})

