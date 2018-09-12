import chai from 'chai';
import {expect} from 'chai';
import sinon from 'sinon';
import Messages from "../src/messages";

// 配列で受け取った文字列内の余分なスペースを取り除く 
describe("strippedMessages", function(){
  it("文字列の配列を送り文字列の配列で受け取る", function(){
    expect(Messages.strippedMessages(["test"])).to.have.lengthOf(1);
  })
  it("文字列内の空白を削除している", function(){
    expect(Messages.strippedMessages(["last ", " first", " a l l "])).to.include.members(["last", "first", 'all']);
  })

})

// 文字列末尾に句点を加える ただし末尾が!や?の時はくわえない  
describe("addPeriod", function(){
  it("文字列の配列を送り文字列の配列で受け取る", function(){
    expect(Messages.addPeriod(["test"])).to.have.lengthOf(1);
  })
  it("すべての文字列末尾に句点を加える", function(){
    expect(Messages.addPeriod(["first", "last"])).to.include.members(["first。", "last。"]);
  })
  it("末尾が!や?の時はくわえない", function(){
    expect(Messages.addPeriod(["bikkuri!", " hatena?"])).to.include.members(["bikkuri!", " hatena?"]);
  })

})

// 配列で受け取った文字列を140文字を超えないように結合していく 
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
