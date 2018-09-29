module.exports = class Sheet {
  constructor (spreadsheetId, sheetName){
    this.spreadsheetId = spreadsheetId;
    this.spreadsheet = null;
    this.sheet = null;
    this.range = null;
    this.sheetName = sheetName;
    this.log = '';
    this.offsetRow = 1;
    this.offsetCol = 1;
  }

  load() {
    if (!this.getSpreadsheet()) return false;
    return this.getSheet();
  }

  // スプレッドシートを取得する 
  // ID が不正だったとき例外が発生してしまうのでキャッチしてfalseを返す 
  getSpreadsheet() {
    try {
      this.spreadsheet = SpreadsheetApp.openById(this.spreadsheetId);
      return this.spreadsheet;
    } catch(e) {
      this.log.concat("Bad id\n");
      return false;
    }
  }

  // シートをゲット
  // メンバー変数sheetに設定する
  // 失敗した場合falseを返す
  getSheet() {
    this.sheet = this.spreadsheet.getSheetByName(this.sheetName);
    if (!this.sheet) {
      this.log.concat("Bad Sheetname\n");
      return false;
    }
    return this.sheet;
  }

  getLastRow() {
    return this.sheet.getLastRow();
  }

  getLastColumn() {
    return this.sheet.getLastColumn();
  }

  // セルRangeを指定行数返す
  getRange(row, col, rows, cols) {
    return this.sheet.getRange(row, col, rows, cols);
  }

  // メンバ変数rangeに指定された範囲のRangeを設定する 
  selectRange(row, col, rows, cols) {
    this.range = this.getRange(row, col, rows, cols);
    return this.range;
  }

  // シートの中で値が入力されている範囲全体を選択して返す
  // ただしデータが入力されていなければfalseを返す
  selectAll() {
    let rows = this.getLastRow();
    if (rows < 1) return false;
    let cols = this.getLastColumn();
    return this.selectRange(this.offsetRow, this.offsetCol, rows - this.offsetRow + 1, cols - this.offsetRow + 1);
  }

  getValues() {
    return this.range.getValues();
  }

  // rangeに値をセットする
  // 成功するとrangeを返す 
  setValues(values) {
    return this.range.setValues(values);
  }

  // シートの全ての文字列を[row][col]で返す
  // arrayではなくobjectで返すようだ 
  // データがないときは空の array を返す
  values() {
    if (!this.selectAll()) return [];
    return this.getValues();
  }

  clear() {
    this.sheet.clear()
  }
  
}
  