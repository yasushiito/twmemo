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
function testSelectAll() {
}
function testValues() {
}
function testPost() {
}
function testDictionary() {
}(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sheet = require('../src/sheet');

module.exports = function (_Sheet) {
  _inherits(Dictionary, _Sheet);

  function Dictionary(spreadsheetId) {
    _classCallCheck(this, Dictionary);

    var _this = _possibleConstructorReturn(this, (Dictionary.__proto__ || Object.getPrototypeOf(Dictionary)).call(this, spreadsheetId, "dictionary"));

    _this.words = null;
    return _this;
  }

  _createClass(Dictionary, [{
    key: "load",
    value: function load() {
      var l = _get(Dictionary.prototype.__proto__ || Object.getPrototypeOf(Dictionary.prototype), "load", this).call(this);
      if (!l) return l;
      this.words = this.values();
    }
  }, {
    key: "replace",
    value: function replace(message) {
      for (var i = 0; i < this.words.length; i++) {
        message = message.split(this.words[i][0]).join(this.words[i][1]);
      }
      return message;
    }
  }]);

  return Dictionary;
}(Sheet);

},{"../src/sheet":5}],2:[function(require,module,exports){
(function (global){
"use strict";

require("../src/twitter");
var Tweet = require("../src/tweet");
var Messages = require("../src/messages");
var Memo = require("../src/memo");
var Dictionary = require("../src/dictionary");

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
  return memo.getSpreadsheet();
};

global.testGetSheet = function (sheetId) {
  var memo = new Memo(sheetId);
  memo.getSpreadsheet();
  return memo.getSheet();
};

global.testSelectAll = function (sheetId) {
  var memo = new Memo(sheetId);
  memo.load();
  return memo.selectAll();
};

global.testValues = function (sheetId) {
  var memo = new Memo(sheetId);
  memo.load();
  return memo.values();
};

global.testPost = function (sheetId) {
  var tweet = new Tweet();
  return tweet.tweetMemo(sheetId);
};

global.testDictionary = function (sheetId, msg) {
  var d = new Dictionary(sheetId);
  d.load();
  return d.replace(msg);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../src/dictionary":1,"../src/memo":3,"../src/messages":4,"../src/tweet":6,"../src/twitter":7}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sheet = require('../src/sheet');

module.exports = function (_Sheet) {
  _inherits(Memo, _Sheet);

  function Memo(spreadsheetId) {
    _classCallCheck(this, Memo);

    return _possibleConstructorReturn(this, (Memo.__proto__ || Object.getPrototypeOf(Memo)).call(this, spreadsheetId, "messages"));
  }

  // memoスプレッドシートを取得する 

  // シートの全ての文字列(B列)を返す 


  _createClass(Memo, [{
    key: "valuesToMessages",
    value: function valuesToMessages() {
      var val = this.values();
      var messages = [];
      for (var row = 0; row < val.length; row++) {
        messages.push(val[row][1]);
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
        values.push([null, messages[i]]);
      };
      return values;
    }

    // メッセージを配列で渡すとメモをクリアして
    // 受け取った文字列を上書きしていく 
    // その数だけセルのrangeを選択して上書きする 
    // 選択したrangeを戻す
    // 処理すべきメッセージがない場合 null を返す 

  }, {
    key: "overwriteMessages",
    value: function overwriteMessages(messages) {
      this.clear();
      if (messages.length < 1) return null;
      var values = this.messagesToValues(messages);
      this.selectRange(this.offsetRow, this.offsetCol, messages.length, 2);
      return this.setValues(values);
    }
  }]);

  return Memo;
}(Sheet);

},{"../src/sheet":5}],4:[function(require,module,exports){
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
  }, {
    key: "replaceByDictionary",
    value: function replaceByDictionary(messages, dictionary) {
      if (!dictionary) return messages;
      return messages.map(function (message) {
        return dictionary.replace(message);
      });
    }
  }]);

  return Messages;
}();

},{}],5:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function Sheet(spreadsheetId, sheetName) {
    _classCallCheck(this, Sheet);

    this.spreadsheetId = spreadsheetId;
    this.spreadsheet = null;
    this.sheet = null;
    this.range = null;
    this.sheetName = sheetName;
    this.log = '';
    this.offsetRow = 1;
    this.offsetCol = 1;
  }

  _createClass(Sheet, [{
    key: "load",
    value: function load() {
      if (!this.getSpreadsheet()) return false;
      return this.getSheet();
    }

    // スプレッドシートを取得する 
    // ID が不正だったとき例外が発生してしまうのでキャッチしてfalseを返す 

  }, {
    key: "getSpreadsheet",
    value: function getSpreadsheet() {
      try {
        this.spreadsheet = SpreadsheetApp.openById(this.spreadsheetId);
        return this.spreadsheet;
      } catch (e) {
        this.log.concat("Bad id\n");
        return false;
      }
    }

    // シートをゲット
    // メンバー変数sheetに設定する
    // 失敗した場合falseを返す

  }, {
    key: "getSheet",
    value: function getSheet() {
      this.sheet = this.spreadsheet.getSheetByName(this.sheetName);
      if (!this.sheet) {
        this.log.concat("Bad Sheetname\n");
        return false;
      }
      return this.sheet;
    }
  }, {
    key: "getLastRow",
    value: function getLastRow() {
      return this.sheet.getLastRow();
    }
  }, {
    key: "getLastColumn",
    value: function getLastColumn() {
      return this.sheet.getLastColumn();
    }

    // セルRangeを指定行数返す

  }, {
    key: "getRange",
    value: function getRange(row, col, rows, cols) {
      return this.sheet.getRange(row, col, rows, cols);
    }

    // メンバ変数rangeに指定された範囲のRangeを設定する 

  }, {
    key: "selectRange",
    value: function selectRange(row, col, rows, cols) {
      this.range = this.getRange(row, col, rows, cols);
      return this.range;
    }

    // シートの中で値が入力されている範囲全体を選択して返す
    // ただしデータが入力されていなければfalseを返す

  }, {
    key: "selectAll",
    value: function selectAll() {
      var rows = this.getLastRow();
      if (rows < 1) return false;
      var cols = this.getLastColumn();
      return this.selectRange(this.offsetRow, this.offsetCol, rows - this.offsetRow + 1, cols - this.offsetRow + 1);
    }
  }, {
    key: "getValues",
    value: function getValues() {
      return this.range.getValues();
    }

    // rangeに値をセットする
    // 成功するとrangeを返す 

  }, {
    key: "setValues",
    value: function setValues(values) {
      return this.range.setValues(values);
    }

    // シートの全ての文字列を[row][col]で返す
    // arrayではなくobjectで返すようだ 
    // データがないときは空の array を返す

  }, {
    key: "values",
    value: function values() {
      if (!this.selectAll()) return [];
      return this.getValues();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.sheet.clear();
    }
  }]);

  return Sheet;
}();

},{}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Messages = require("../src/messages");
var Memo = require("../src/memo");
var Dictionary = require("../src/dictionary");

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
    value: function toTweets(messages, dictionary) {
      // メッセージの無駄な空白を取り除く
      // メッセージに句点を加える
      // コマンド行を処理する(現在ハッシュタグ変換のみ)
      // メッセージをできるだけ140文字に収まるように結合する 
      // ツイートが極力無駄のないように結合するがハッシュタグが別のツイートに分断されることはある 
      return Messages.joinMessages(Messages.replaceByDictionary(Messages.replaceTag(Messages.addPeriod(Messages.strippedMessages(messages))), dictionary));
    }
  }, {
    key: "tweetMemo",
    value: function tweetMemo(sheetId) {
      var memo = new Memo(sheetId);
      var dictionary = new Dictionary(sheetId);
      // メッセージを貯めるシートからツイートするメッセージを取得する 
      if (!memo.load()) return memo.log;
      if (!dictionary.load()) dictionary = null;
      var messages = memo.getMessages();
      if (messages.length < 1) return 'no message';
      // 
      var tweets = this.toTweets(messages, dictionary);
      // 出来上がったツイートを投稿 送信に失敗したメッセージが返ってくる 
      var failedTweets = this.postMessages(tweets);
      // 一度シートをクリアしてから投稿に失敗したメッセージをシートに戻す
      memo.overwriteMessages(failedTweets);
      return 'post ok';
    }
  }]);

  return Tweet;
}();

},{"../src/dictionary":1,"../src/memo":3,"../src/messages":4}],7:[function(require,module,exports){
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
},{}]},{},[2]);
