var Sheet = require('../src/sheet');

module.exports = class Memo extends Sheet {
  constructor (spreadsheetId){
    super(spreadsheetId, "messages");
  }

  // memoスプレッドシートを取得する 

  // シートの全ての文字列(B列)を返す 
  valuesToMessages() {
    var val = this.values();
    var messages = [];
    for (let row = 0; row < val.length; row++) {
      messages.push(val[row][1]);
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
    for(let i = 0; i < messages.length; i++){ values.push([null, messages[i]]) };
    return values;
  }

  // メッセージを配列で渡すとメモをクリアして
  // 受け取った文字列を上書きしていく 
  // その数だけセルのrangeを選択して上書きする 
  // 選択したrangeを戻す
  // 処理すべきメッセージがない場合 null を返す 
  overwriteMessages(messages) {
    this.clear();
    if (messages.length < 1) return null;
    let values = this.messagesToValues(messages);
    this.selectRange(this.offsetRow, this.offsetCol, messages.length, 2);
    return this.setValues(values);
  }
  
}
  