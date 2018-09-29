var Sheet = require('../src/sheet');

module.exports = class Dictionary extends Sheet {
  constructor (spreadsheetId){
    super(spreadsheetId, "dictionary");
    this.words = null;
  }

  load() {
    let l = super.load();
    if (!l) return l;
    this.words = this.values();
    return l;
  }

  replace(message){
    for(let i = 0; i < this.words.length; i++) {
      message = message.split(this.words[i][0]).join(this.words[i][1]);
    }
    return message;
  }
  
}
