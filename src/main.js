require("../src/twitter");
var Tweet = require("../src/tweet");
var Messages = require("../src/messages");
var Memo = require("../src/memo");
var Dictionary = require("../src/dictionary");


// postリクエストから渡ってきたパラメータを解凍する
global.getPostParameters = function(ev) {
  var params;
  try {
    params = JSON.parse(ev.postData.getDataAsString());
  } catch(e) {
    params = {};
  }
  return params;
}

// ポスト処理の入り口
global.post = function(sheetId) {
  let tweet = new Tweet();
  return tweet.tweetMemo(sheetId);
}

// リクエストの応答ページを返す
// ただしgasの公開Webアプリケーションの応答はステータス302を返すので実質的には捨てられる 
global.makeContent = function(content) {
  return ContentService.createTextOutput(JSON.stringify({'content': content})).setMimeType(ContentService.MimeType.JSON);
}

// 本番環境で結合テストする
global.testGetSpreadsheet = function(sheetId) {
  let memo = new Memo(sheetId);
  return memo.getSpreadsheet();
}

global.testGetSheet = function(sheetId) {
  let memo = new Memo(sheetId);
  memo.getSpreadsheet();
  return memo.getSheet();
}

global.testSelectAll = function(sheetId) {
  let memo = new Memo(sheetId);
  memo.load();
  return memo.selectAll();
}

global.testValues = function(sheetId) {
  let memo = new Memo(sheetId);
  memo.load();
  return memo.values();
}

global.testPost = function(sheetId) {
  var tweet = new Tweet();
  return tweet.tweetMemo(sheetId);
}

global.testDictionary = function(sheetId, msg) {
  var d = new Dictionary(sheetId);
  d.load();
  return d.replace(msg);
}

