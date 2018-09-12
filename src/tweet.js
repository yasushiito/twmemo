var Messages = require("../src/messages");
var Memo = require("../src/memo");

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
  
  toTweets(messages) {
    // メッセージの無駄な空白を取り除く
    // メッセージに句点を加える
    // メッセージをできるだけ140文字に収まるように結合する 
    return Messages.joinMessages(Messages.addPeriod(Messages.strippedMessages(messages)));
  }

  tweetMemo(sheetId) {
    var memo = new Memo(sheetId);
    // メッセージを貯めるシートからツイートするメッセージを取得する 
    var res = memo.getSheet();
    if (typeof res == 'string') return res;
    var messages = memo.getMessages();
    if (messages.length < 1) return 'no message';
    // 
    let tweets = this.toTweets(messages);
    // 出来上がったツイートを投稿 送信に失敗したメッセージが返ってくる 
    let failedTweets = this.postMessages(tweets);
    // 一度シートをクリアしてから投稿に失敗したメッセージをシートに戻す
    memo.putMessages(failedTweets);
    return 'post ok';
  }

}
