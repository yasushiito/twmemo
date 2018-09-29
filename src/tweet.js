var Messages = require("../src/messages");
var Memo = require("../src/memo");
var Dictionary = require("../src/dictionary");

module.exports = class Tweet {
  constructor (){
  }

  // 配列で受け取ったツイート内容を順番に投稿する 
  postMessages(messages) {
    var left = [];
    for(let i = 0; i < messages.length; i++) {
      if (!postUpdateStatus(messages[i])) {
        left.push(messages[i]);
      }
    };
    return left;
  }
  
  toTweets(messages, dictionary) {
    // メッセージの無駄な空白を取り除く
    // メッセージに句点を加える
    // コマンド行を処理する(現在ハッシュタグ変換のみ)
    // メッセージをできるだけ140文字に収まるように結合する 
    // ツイートが極力無駄のないように結合するがハッシュタグが別のツイートに分断されることはある 
    return Messages.joinMessages(Messages.replaceByDictionary(Messages.replaceTag(Messages.addPeriod(Messages.strippedMessages(messages))), dictionary));
  }

  tweetMemo(sheetId) {
    var memo = new Memo(sheetId);
    var dictionary = new Dictionary(sheetId);
    // メッセージを貯めるシートからツイートするメッセージを取得する 
    if (!memo.load()) return memo.log;
    if (!dictionary.load()) dictionary = null;
    var messages = memo.getMessages();
    if (messages.length < 1) return 'no message';
    // 
    let tweets = this.toTweets(messages, dictionary);
    // 出来上がったツイートを投稿 送信に失敗したメッセージが返ってくる 
    let failedTweets = this.postMessages(tweets);
    // 一度シートをクリアしてから投稿に失敗したメッセージをシートに戻す
    memo.overwriteMessages(failedTweets);
    return 'post ok';
  }

}
