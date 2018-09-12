
global.apiKey = function() {
  return PropertiesService.getUserProperties().getProperty("TWITTER_API_KEY");
}

global.apiSecret = function() {
  return PropertiesService.getUserProperties().getProperty("TWITTER_API_SECRET");
}

// 認証用インスタンス
global.getService = function() {
  return OAuth1.createService('Twitter')
    .setAccessTokenUrl('https://api.twitter.com/oauth/access_token')
    .setRequestTokenUrl('https://api.twitter.com/oauth/request_token')
    .setAuthorizationUrl('https://api.twitter.com/oauth/authorize')
    .setConsumerKey(apiKey())
    .setConsumerSecret(apiSecret())
    .setCallbackFunction('authCallback')
    .setPropertyStore(PropertiesService.getUserProperties());
}

// 認証解除
global.reset = function() {
  twitter = getService();
  twitter.reset();
}

// 認証
// 第一段階としてこの関数を実行
// ログに出力されている URL をブラウザで開いてシークレットを取得する 
// ブラウザに表示されたシークレットをユーザプロパティに登録する 
global.authorize = function() {
  twitter = getService();
  // 認証許可するための URL をログに残す
  Logger.log(twitter.authorize());
}

// 認証後のコールバック
global.authCallback = function(request) {
  var service = getService();
  var authorized = service.handleCallback(request);
  if (authorized) return HtmlService.createHtmlOutput('認証成功');
}

// ツイートを投稿
global.postUpdateStatus = function(message) {
  var res = null;
  var service  = getService();
  if (service.hasAccess()) {
    var response = service.fetch('https://api.twitter.com/1.1/statuses/update.json', {
      method: 'post',
      payload: { status: message }
    });
    var status = response.getResponseCode();
    if (status == 200) {
      res = JSON.parse(response.getContentText());
      // Logger.log(JSON.stringify(res, null, 2));
    } else {
      Logger.log(status);
    }
  }
  return res;
}

 