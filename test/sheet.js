import chai from 'chai';
import {expect} from 'chai';
import sinon from 'sinon';
import Sheet from "../src/sheet";
var sid = 'test id';
var sname = 'messages';

// 環境依存なのでテストできない 
describe("getSpreadsheet", function(){
  afterEach(() => {
  });
  it("スプレッドシートの取得に失敗した場合ログにエラーメッセージ`Bad id'を設定する", function(){
  })
})

// 環境依存なのでテストできない 
describe("getSheet", function(){
  afterEach(() => {
  });
  it("シートの取得に失敗した場合ログにエラーメッセージ`Bad Sheetname'を設定する", function(){
  })
})

describe("load", function(){
  it("正常終了した場合メンバー変数sheetにSheetを設定する", function(){
    let s = new Sheet(sid, sname);
    let spreadsheet = new Object();   // dummy class of Spreadsheet
    let sheet = new Object();   // dummy class of Sheet
    sinon.stub(s, "getSheet").returns(sheet);
    sinon.stub(s, "getSpreadsheet").returns(spreadsheet);
    expect(s.load()).to.be.an.instanceOf(Object);
    s.getSpreadsheet.restore();
    s.getSheet.restore();
  })
  it("スプレッドシートの取得に失敗した場合falseを返す", function(){
    let s = new Sheet(sid, sname);
    let spreadsheet = new Object();   // dummy class of Spreadsheet
    sinon.stub(s, "getSpreadsheet").returns(false);
    expect(s.load()).to.be.false;
    s.getSpreadsheet.restore();
  })
  it("シートの取得に失敗した場合falseを返す", function(){
    let s = new Sheet(sid, sname);
    let spreadsheet = new Object();   // dummy class of Spreadsheet
    sinon.stub(s, "getSheet").returns(false);
    sinon.stub(s, "getSpreadsheet").returns(spreadsheet);
    expect(s.load()).to.be.false;
    s.getSheet.restore();
    s.getSpreadsheet.restore();
  })
})

describe("selectRange", function(){
  beforeEach(() => {
  });
  
  it("メンバ変数rangeに指定された範囲のrangeを設定する", function(){
    let s = new Sheet(sid, sname);
    sinon.stub(s, "getRange").returns({});
    s.selectRange();
    expect(s.range).to.be.not.null;
    s.getRange.restore();
  })
})

// 入力データを一気に取得するための範囲選択
describe("selectAll", function(){
  beforeEach(() => {
  });
  
  it("シートの中で値が入力されている範囲全体を選択して返す", function(){
    let s = new Sheet(sid, sname);
    // 3行2列のデータが入っている前提でテストする
    sinon.stub(s, "getLastRow").returns(3);
    sinon.stub(s, "getLastColumn").returns(2);
    sinon.stub(s, "selectRange").withArgs(1, 1, 3, 2).returns({});
    expect(s.selectAll()).to.be.not.false;
    s.getLastRow.restore();
    s.getLastColumn.restore();
    s.selectRange.restore();
  })
  it("ただしデータが入力されていなければfalseを返す", function(){
    let s = new Sheet(sid, sname);
    sinon.stub(s, "getLastRow").returns(0);
    expect(s.selectAll()).to.be.false;
    s.getLastRow.restore();
  })
})

describe("values", function(){
  beforeEach(() => {
  });
  it("シートの全ての文字列を[row][col]で返す", function(){
    let s = new Sheet(sid, sname);
    sinon.stub(s, "selectAll").returns({});
    sinon.stub(s, "getValues").returns([[null, '1st'], [null, '2nd']]);
    expect(s.values()).to.not.be.empty;
    s.selectAll.restore();
    s.getValues.restore();
  })
  it("データがないときは空の array を返す", function(){
    let s = new Sheet(sid, sname);
    sinon.stub(s, "selectAll").returns(false);
    expect(s.values()).to.be.empty;
    s.selectAll.restore();
  })
})

