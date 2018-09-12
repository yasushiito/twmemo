import chai from 'chai';
import {expect} from 'chai';
import sinon from 'sinon';
import Memo from "../src/memo";
var sid = 'test id';

// 環境依存なのでテストできない 
describe("_getSpreadsheet", function(){
  afterEach(() => {
  });
})

// 環境依存なのでテストできない 
describe("_getSheet", function(){
  afterEach(() => {
  });
})

describe("getSheet", function(){
  it("正常終了した場合メンバー変数sheetにSheetを設定する", function(){
    let m = new Memo(sid);
    let spreadsheet = new Object();   // dummy class of Spreadsheet
    let sheet = new Object();   // dummy class of Sheet
    sinon.stub(m, "_getSheet").returns(sheet);
    sinon.stub(m, "_getSpreadsheet").returns(spreadsheet);
    expect(m.getSheet()).to.be.an.instanceOf(Object);
    m._getSpreadsheet.restore();
    m._getSheet.restore();
  })
  it("スプレッドシートの取得に失敗した場合エラー文字列`Bad id'を返す", function(){
    let m = new Memo(sid);
    let spreadsheet = new Object();   // dummy class of Spreadsheet
    sinon.stub(m, "_getSpreadsheet").returns('Bad id');
    expect(typeof m.getSheet()).to.be.equal('string');
    m._getSpreadsheet.restore();
  })
  it("シートの取得に失敗した場合エラー文字列`Bad Sheetname'を返す", function(){
    let m = new Memo(sid);
    let spreadsheet = new Object();   // dummy class of Spreadsheet
    let sheet = new Object();   // dummy class of Sheet
    sinon.stub(m, "_getSheet").returns(null);
    sinon.stub(m, "_getSpreadsheet").returns(spreadsheet);
    expect(m.getSheet()).to.be.equal('Bad Sheetname');
    m._getSheet.restore();
    m._getSpreadsheet.restore();
  })
})

describe("rows", function(){
  beforeEach(() => {
  });
  
  it("シートのデータ最終行を数値(0~)で返す", function(){
    let m = new Memo(sid);
    sinon.stub(m, "_getLastRow").returns(3);
    expect(m.rows()).to.equal(3);
    m._getLastRow.restore();
  })
})

describe("values", function(){
  beforeEach(() => {
  });
  it("文字列(B列)を[row][col]で返す", function(){
    let m = new Memo(sid);
    let res = [['msg1'], ['msg2']];
    let range = new Object();   // dummy class of range
    sinon.stub(m, "rows").returns(res.length);
    sinon.stub(m, "_getRange").returns(range);
    sinon.stub(m, "_getValues").returns(res);
    expect(m.values()).to.deep.include(['msg1']);
    m.rows.restore();
    m._getRange.restore();
    m._getValues.restore();
  })
  it("データがないときは空の array を返す", function(){
    let m = new Memo(sid);
    let res = [];
    sinon.stub(m, "_getValues").returns(res);
    sinon.stub(m, "rows").returns(res.length);
    expect(m.values()).to.be.empty;
    m.rows.restore();
    m._getValues.restore();
  })
})

describe("valuesToMessages", function(){
  it("行数文の配列を返す", function(){
    let m = new Memo(sid);
    sinon.stub(m, "values").returns([['msg1'], ['msg2']]);
    expect(m.valuesToMessages()).to.have.lengthOf(2);
    m.values.restore();
  })
  it("全ての行のメッセージ列を返す", function(){
    let m = new Memo(sid);
    sinon.stub(m, "values").returns([['msg1'], ['msg2']]);
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
    expect(m.messagesToValues(['msg1', 'msg2'])).to.deep.include(['msg1']);
  })
})

describe("putMessages", function(){
  it("セルのrangeを選択して上書き 選択したレンジを戻す", function(){
    let m = new Memo(sid);
    let msgs = ['msg1', 'msg2'];
    let values = [['msg1'], ['msg2']];
    let range = new Object();   // dummy class of Range
    sinon.stub(m, "_clear").returns(null);
    sinon.stub(m, "messagesToValues").returns(values);
    sinon.stub(m, "_getRange").returns(range);
    sinon.stub(m, "_setValues").withArgs(range, values).returns(range);
    expect(m.putMessages(msgs)).to.be.equal(range);
    m._clear.restore();
    m.messagesToValues.restore();
    m._getRange.restore();
    m._setValues.restore();
  })
  it("全ての行のメッセージ列を返す", function(){
  })
  it("処理すべきメッセージがない場合 null を返す", function(){
    let m = new Memo(sid);
    sinon.stub(m, "_clear").returns(null);
    expect(m.putMessages([])).to.be.null;
    m._clear.restore();
  })

})

