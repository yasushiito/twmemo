module.exports = class Memo {
  constructor (sheetId){
    this.sheetId = sheetId;
    this.sheet = null;
    this.sheetName = "messages";
  }

  // memoスプレッドシートを取得する 
  // ID が不正だったとき例外が発生してしまうのでキャッチしてエラーメッセージを返す 
  _getSpreadsheet() {
    try {
      return SpreadsheetApp.openById(this.sheetId);
    } catch(e) {
      return "Bad id";
    }
  }

  // スプレッドシートからメッセージシートを取得する 
  _getSheet(spreadsheet) {
    return spreadsheet.getSheetByName(this.sheetName);
  }

  // ツイートしたいメッセージを記入するシートをゲット
  // メンバー変数sheetに設定する
  // 失敗した場合エラー文字列を返す
  getSheet() {
    let sp = this._getSpreadsheet(this.sheetId);
    if (typeof sp == 'string') return sp;   // スプレッドシートの取得に失敗した場合エラー文字列を返す
    this.sheet = this._getSheet(sp);
    if (!this.sheet) return 'Bad Sheetname';
    return this.sheet
  }

  _getLastRow() {
    return this.sheet.getLastRow();
  }

  // メモのセルRangeを指定行数返す
  _getRange(rows) {
    return this.sheet.getRange(1, 2, rows);
  }

  _getValues(range) {
    return range.getValues();
  }

  // rangeに値をセットする
  // 成功するとrangeを返す 
  _setValues(range, values) {
    return range.setValues();
  }

  // シートのデータ最終行を数値(0~)で返す
  rows() {
    return this._getLastRow();
  }

  // シートの全ての文字列(B列)を[row][col]で返す
  // arrayではなくobjectで返すようだ 
  // データがないときは空の array を返す
  values() {
    let rows = this.rows();
    if (rows < 1) return [];
    let range = this._getRange(rows);
    return this._getValues(range);
  }

  // シートの全ての文字列(B列)を返す 
  valuesToMessages() {
    var val = this.values();
    var messages = [];
    for (let row = 0; row < val.length; row++) {
      messages.push(val[row][0]);
    }
    return messages;
  }

  // メッセージ全てを配列にして返す 
  // putMessages関数と対になってるよ 
  getMessages() {
    return this.valuesToMessages();
  }

  // メッセージをセル RANGE 形式の[row][col]配列で返す 
  messagesToValues(messages) {
    var values = [];
    for(let i = 0; i < messages.length; i++){ values.push([messages[i]]) };
    return values;
  }

  // メッセージを配列で渡すとメモをクリアして
  // 受け取った文字列をB 列に上書きしていく 
  // その数だけセルのrangeを選択して上書きする 
  // 選択したrangeを戻す
  // 処理すべきメッセージがない場合 null を返す 
  putMessages(messages) {
    this._clear()
    if (messages.length < 1) return null;
    let values = this.messagesToValues(messages);
    let range = this._getRange(messages.length);
    return this._setValues(range, values);
  }
  
  _clear() {
    this.sheet.clear()
  }
  
}
  