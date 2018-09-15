// gasと密結合した機能はここに書く
// gasifyで関数を認識できるようになっていても API 起動関数などは呼び出せない 
// クラスで定義された機能はglobal.に書いた関数を経由しないと利用できない


// Post メソッドでリクエストされた時に起動する関数 
// curl -d {\"sheet_id\":\"{spreadsheetId}\"} -H 'Content-Type: application/json' -X POST https://script.google.com/macros/s/{projectId}/exec
function doPost(e) {
  var params = getPostParameters(e);
  var sheetId = params.sheet_id;
  return makeContent(post(sheetId));
}

function setTwitterApiKey(key) {
  PropertiesService.getUserProperties().setProperty("TWITTER_API_KEY", key);
  Logger.log(key);
}

function setTwitterApiSecret(secret) {
  PropertiesService.getUserProperties().setProperty("TWITTER_API_SECRET", secret);
  Logger.log(secret);
}

function setSheetId(sheetId) {
  PropertiesService.getUserProperties().setProperty("TWITTER_API_SECRET", sheetId);
  Logger.log(sheetId);
}

function firstStep() {
  setTwitterApiKey('');
  setTwitterApiSecret('');
  authorize();
  // see url on log message
}

function secondStep() {
}

function testMemo() {
  var sheetId = '';
  Logger.log(testGetSpreadsheet(sheetId));
  Logger.log(testGetSheet(sheetId));
  Logger.log(testGetRange(sheetId));
  Logger.log(testLastRow(sheetId));
  Logger.log(testValues(sheetId));
}

function testTweet() {
  var sheetId = '1RPsEu-Lqo5PnPyoS3evNQzm02Cjy9xMi-04cx1oAHdk';
  Logger.log(testPost(sheetId));
}
