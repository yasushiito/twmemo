module.exports = class Messages {
// 配列で受け取った文字列内の余分なスペースを取り除く 
 static strippedMessages(messages) {
    return messages.map(function (value, index, array) { return value.replace(/\s+/g, "")});
  }

  // 文字列に句点を加える ただし末尾が!や?の時はくわえない  
  static addPeriod(messages) {
    return messages.map(function (value, index, array) { return value.replace(/([^!?])$/g, "$1。")});
  }

  // 配列で受け取った文字列を140文字を超えないように結合していく 
  static joinMessages(messages) {
    var res = [];
    var msg = "";
    var work;
    for (let i = 0; i < messages.length; i++) {
      work = msg + messages[i];
      if (work.length > 140) {
        res.push(msg);
        msg = messages[i];
      } else {
        msg = work;
      }
    }
    res.push(msg);
    return res;
  }
}
