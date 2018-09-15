require("../src/twitter");
var Tweet = require("../src/tweet");
var Messages = require("../src/messages");
var Memo = require("../src/memo");

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
  return memo._getSpreadsheet();
}

global.testGetSheet = function(sheetId) {
  let memo = new Memo(sheetId);
  return memo.getSheet();
}

global.testGetRange = function(sheetId) {
  let memo = new Memo(sheetId);
  memo.getSheet();
  return memo._getRange(1);
}

global.testLastRow = function(sheetId) {
  let memo = new Memo(sheetId);
  memo.getSheet();
  return memo._getLastRow();
}

global.testValues = function(sheetId) {
  let memo = new Memo(sheetId);
  memo.getSheet();
  return memo.values();
}

global.testPost = function(sheetId) {
  var tweet = new Tweet();
  return tweet.tweetMemo(sheetId);
}

