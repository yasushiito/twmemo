import chai from 'chai';
import {expect} from 'chai';
import sinon from 'sinon';
import Memo from "../src/memo";
var sid = 'test id';

describe("valuesToMessages", function(){
  it("行数文の配列を返す", function(){
    let m = new Memo(sid);
    sinon.stub(m, "values").returns([[null, 'msg1'], [null, 'msg2']]);
    expect(m.valuesToMessages()).to.have.lengthOf(2);
    m.values.restore();
  })
  it("全ての行のメッセージ列を返す", function(){
    let m = new Memo(sid);
    sinon.stub(m, "values").returns([[null, 'msg1'], [null, 'msg2']]);
    expect(m.valuesToMessages()).to.include.members(['msg1', 'msg2']);
    m.values.restore();
  })
  it("データがないときは空の配列を返す", function(){
    let m = new Memo(sid);
    sinon.stub(m, "values").returns([]);
    expect(m.valuesToMessages()).to.empty;
    m.values.restore();
  })

})

describe("getMessages", function(){
})

describe("messagesToValues", function(){
  it("メッセージをセル RANGE 形式の[row][col]配列で返す", function(){
    let m = new Memo(sid);
    expect(m.messagesToValues(['msg1', 'msg2'])).to.deep.include([null, 'msg1']);
  })
})

describe("overwriteMessages", function(){
  it("セルのrangeを選択して上書き 選択したレンジを戻す", function(){
    let m = new Memo(sid);
    let msgs = [[null, 'msg1'], [null, 'msg2']];
    let values = [['msg1'], ['msg2']];
    let range = new Object();   // dummy class of Range
    sinon.stub(m, "clear").returns(null);
    sinon.stub(m, "messagesToValues").returns(values);
    sinon.stub(m, "getLastRow").returns(2);
    sinon.stub(m, "getLastColumn").returns(2);
    sinon.stub(m, "selectRange").returns(range);
    sinon.stub(m, "setValues").withArgs(values).returns(range);
    expect(m.overwriteMessages(msgs)).to.be.equal(range);
    m.clear.restore();
    m.messagesToValues.restore();
    m.getLastRow.restore();
    m.getLastColumn.restore();
    m.selectRange.restore();
    m.setValues.restore();
  })
  it("全ての行のメッセージ列を返す", function(){
  })
  it("処理すべきメッセージがない場合 null を返す", function(){
    let m = new Memo(sid);
    sinon.stub(m, "clear").returns(null);
    expect(m.overwriteMessages([])).to.be.null;
    m.clear.restore();
  })

})

