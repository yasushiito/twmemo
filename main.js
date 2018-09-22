var global = this;function apiKey() {
}
function apiSecret() {
}
function getService() {
}
function reset() {
}
function authorize() {
}
function authCallback() {
}
function postUpdateStatus() {
}function getPostParameters() {
}
function post() {
}
function makeContent() {
}
function testGetSpreadsheet() {
}
function testGetSheet() {
}
function testGetRange() {
}
function testLastRow() {
}
function testValues() {
}
function testPost() {
}(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
"use strict";

require("../src/twitter");
var Tweet = require("../src/tweet");
var Messages = require("../src/messages");
var Memo = require("../src/memo");

// postリクエストから渡ってきたパラメータを解凍する
global.getPostParameters = function (ev) {
  var params;
  try {
    params = JSON.parse(ev.postData.getDataAsString());
  } catch (e) {
    params = {};
  }
  return params;
};

// ポスト処理の入り口
global.post = function (sheetId) {
  var tweet = new Tweet();
  return tweet.tweetMemo(sheetId);
};

// リクエストの応答ページを返す
// ただしgasの公開Webアプリケーションの応答はステータス302を返すので実質的には捨てられる 
global.makeContent = function (content) {
  return ContentService.createTextOutput(JSON.stringify({ 'content': content })).setMimeType(ContentService.MimeType.JSON);
};

// 本番環境で結合テストする
global.testGetSpreadsheet = function (sheetId) {
  var memo = new Memo(sheetId);
  return memo._getSpreadsheet();
};

global.testGetSheet = function (sheetId) {
  var memo = new Memo(sheetId);
  return memo.getSheet();
};

global.testGetRange = function (sheetId) {
  var memo = new Memo(sheetId);
  memo.getSheet();
  return memo._getRange(1);
};

global.testLastRow = function (sheetId) {
  var memo = new Memo(sheetId);
  memo.getSheet();
  return memo._getLastRow();
};

global.testValues = function (sheetId) {
  var memo = new Memo(sheetId);
  memo.getSheet();
  return memo.values();
};

global.testPost = function (sheetId) {
  var tweet = new Tweet();
  return tweet.tweetMemo(sheetId);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../src/memo":2,"../src/messages":3,"../src/tweet":4,"../src/twitter":5}],2:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function Memo(sheetId) {
    _classCallCheck(this, Memo);

    this.sheetId = sheetId;
    this.sheet = null;
    this.sheetName = "messages";
  }

  // memoスプレッドシートを取得する 
  // ID が不正だったとき例外が発生してしまうのでキャッチしてエラーメッセージを返す 


  _createClass(Memo, [{
    key: "_getSpreadsheet",
    value: function _getSpreadsheet() {
      try {
        return SpreadsheetApp.openById(this.sheetId);
      } catch (e) {
        return "Bad id";
      }
    }

    // スプレッドシートからメッセージシートを取得する 

  }, {
    key: "_getSheet",
    value: function _getSheet(spreadsheet) {
      return spreadsheet.getSheetByName(this.sheetName);
    }

    // ツイートしたいメッセージを記入するシートをゲット
    // メンバー変数sheetに設定する
    // 失敗した場合エラー文字列を返す

  }, {
    key: "getSheet",
    value: function getSheet() {
      var sp = this._getSpreadsheet(this.sheetId);
      if (typeof sp == 'string') return sp; // スプレッドシートの取得に失敗した場合エラー文字列を返す
      this.sheet = this._getSheet(sp);
      if (!this.sheet) return 'Bad Sheetname';
      return this.sheet;
    }
  }, {
    key: "_getLastRow",
    value: function _getLastRow() {
      return this.sheet.getLastRow();
    }

    // メモのセルRangeを指定行数返す

  }, {
    key: "_getRange",
    value: function _getRange(rows) {
      return this.sheet.getRange(1, 2, rows);
    }
  }, {
    key: "_getValues",
    value: function _getValues(range) {
      return range.getValues();
    }

    // rangeに値をセットする
    // 成功するとrangeを返す 

  }, {
    key: "_setValues",
    value: function _setValues(range, values) {
      return range.setValues();
    }

    // シートのデータ最終行を数値(0~)で返す

  }, {
    key: "rows",
    value: function rows() {
      return this._getLastRow();
    }

    // シートの全ての文字列(B列)を[row][col]で返す
    // arrayではなくobjectで返すようだ 
    // データがないときは空の array を返す

  }, {
    key: "values",
    value: function values() {
      var rows = this.rows();
      if (rows < 1) return [];
      var range = this._getRange(rows);
      return this._getValues(range);
    }

    // シートの全ての文字列(B列)を返す 

  }, {
    key: "valuesToMessages",
    value: function valuesToMessages() {
      var val = this.values();
      var messages = [];
      for (var row = 0; row < val.length; row++) {
        messages.push(val[row][0]);
      }
      return messages;
    }

    // メッセージ全てを配列にして返す 
    // putMessages関数と対になってるよ 

  }, {
    key: "getMessages",
    value: function getMessages() {
      return this.valuesToMessages();
    }

    // メッセージをセル RANGE 形式の[row][col]配列で返す 

  }, {
    key: "messagesToValues",
    value: function messagesToValues(messages) {
      var values = [];
      for (var i = 0; i < messages.length; i++) {
        values.push([messages[i]]);
      };
      return values;
    }

    // メッセージを配列で渡すとメモをクリアして
    // 受け取った文字列をB 列に上書きしていく 
    // その数だけセルのrangeを選択して上書きする 
    // 選択したrangeを戻す
    // 処理すべきメッセージがない場合 null を返す 

  }, {
    key: "putMessages",
    value: function putMessages(messages) {
      this._clear();
      if (messages.length < 1) return null;
      var values = this.messagesToValues(messages);
      var range = this._getRange(messages.length);
      return this._setValues(range, values);
    }
  }, {
    key: "_clear",
    value: function _clear() {
      this.sheet.clear();
    }
  }]);

  return Memo;
}();

},{}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function Messages() {
    _classCallCheck(this, Messages);
  }

  _createClass(Messages, null, [{
    key: "strippedMessage",

    // 受け取った文字列内の余分なスペースを取り除く 
    value: function strippedMessage(message) {
      if (Messages.hasTag(message)) {
        return message;
      } else {
        return message.replace(/\s+/g, "");
      }
    }

    // 配列で受け取った文字列内の余分なスペースを取り除く 
    // ただしハッシュタグ行の時は処理しない

  }, {
    key: "strippedMessages",
    value: function strippedMessages(messages) {
      return messages.map(function (value, index, array) {
        return Messages.strippedMessage(value);
      });
    }

    // 文字列に句点を加える ただしハッシュタグ行及び 末尾が!や?の時はくわえない  

  }, {
    key: "addPeriod",
    value: function addPeriod(messages) {
      return messages.map(function (value, index, array) {
        if (Messages.hasTag(value)) {
          return value;
        } else {
          return value.replace(/([^!?])$/g, "$1。");
        }
      });
    }

    // 配列で受け取った文字列を140文字を超えないように結合していく 

  }, {
    key: "joinMessages",
    value: function joinMessages(messages) {
      var res = [];
      var msg = "";
      var work;
      for (var i = 0; i < messages.length; i++) {
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

    // ハッシュタグ行ならタグを配列で返す
    // ハッシュタグ行でなければfalseを返す 

  }, {
    key: "hasTag",
    value: function hasTag(message) {
      if (!message.match(/^ハッシュタグ/)) return false;
      return message.replace(/^ハッシュタグ/, '').trim().split(/\s/);
    }

    // メッセージ配列を受け取り各行がハッシュタグ行ならすべてのタグに#をつけてメッセージ配列で返す 

  }, {
    key: "replaceTag",
    value: function replaceTag(messages) {
      var tags;
      return messages.map(function (message) {
        if (!(tags = Messages.hasTag(message))) return message;
        return tags.map(function (value) {
          return '#' + value;
        });
      });
    }
  }]);

  return Messages;
}();

},{}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Messages = require("../src/messages");
var Memo = require("../src/memo");

module.exports = function () {
  function Tweet() {
    _classCallCheck(this, Tweet);
  }

  // 配列で受け取ったツイート内容を順番に投稿する 


  _createClass(Tweet, [{
    key: "postMessages",
    value: function postMessages(messages) {
      var left = [];
      for (var i = 0; i < messages.length; i++) {
        if (!postUpdateStatus(messages[i])) {
          left.push(messages[i]);
        }
      };
      return left;
    }
  }, {
    key: "toTweets",
    value: function toTweets(messages) {
      // メッセージの無駄な空白を取り除く
      // メッセージに句点を加える
      // コマンド行を処理する(現在ハッシュタグ変換のみ)
      // メッセージをできるだけ140文字に収まるように結合する 
      // ツイートが極力無駄のないように結合するがハッシュタグが別のツイートに分断されることはある 
      return Messages.joinMessages(Messages.replaceTag(Messages.addPeriod(Messages.strippedMessages(messages))));
    }
  }, {
    key: "tweetMemo",
    value: function tweetMemo(sheetId) {
      var memo = new Memo(sheetId);
      // メッセージを貯めるシートからツイートするメッセージを取得する 
      var res = memo.getSheet();
      if (typeof res == 'string') return res;
      var messages = memo.getMessages();
      if (messages.length < 1) return 'no message';
      // 
      var tweets = this.toTweets(messages);
      // 出来上がったツイートを投稿 送信に失敗したメッセージが返ってくる 
      var failedTweets = this.postMessages(tweets);
      // 一度シートをクリアしてから投稿に失敗したメッセージをシートに戻す
      memo.putMessages(failedTweets);
      return 'post ok';
    }
  }]);

  return Tweet;
}();

},{"../src/memo":2,"../src/messages":3}],5:[function(require,module,exports){
(function (global){
"use strict";

global.apiKey = function () {
  return PropertiesService.getUserProperties().getProperty("TWITTER_API_KEY");
};

global.apiSecret = function () {
  return PropertiesService.getUserProperties().getProperty("TWITTER_API_SECRET");
};

// 認証用インスタンス
global.getService = function () {
  return OAuth1.createService('Twitter').setAccessTokenUrl('https://api.twitter.com/oauth/access_token').setRequestTokenUrl('https://api.twitter.com/oauth/request_token').setAuthorizationUrl('https://api.twitter.com/oauth/authorize').setConsumerKey(apiKey()).setConsumerSecret(apiSecret()).setCallbackFunction('authCallback').setPropertyStore(PropertiesService.getUserProperties());
};

// 認証解除
global.reset = function () {
  twitter = getService();
  twitter.reset();
};

// 認証
// 第一段階としてこの関数を実行
// ログに出力されている URL をブラウザで開いてシークレットを取得する 
// ブラウザに表示されたシークレットをユーザプロパティに登録する 
global.authorize = function () {
  twitter = getService();
  // 認証許可するための URL をログに残す
  Logger.log(twitter.authorize());
};

// 認証後のコールバック
global.authCallback = function (request) {
  var service = getService();
  var authorized = service.handleCallback(request);
  if (authorized) return HtmlService.createHtmlOutput('認証成功');
};

// ツイートを投稿
global.postUpdateStatus = function (message) {
  var res = null;
  var service = getService();
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
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
