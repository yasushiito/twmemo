import chai from 'chai';
import {expect} from 'chai';
import sinon from 'sinon';
import Dictionary from "../src/dictionary";
var sid = 'test id';

describe("replace", function(){
  it("辞書の単語を置換して返す", function(){
    let d = new Dictionary(sid);
    var w = [['グーグル', 'google']];
    expect(function (){ d.words = w; return d.replace('グーグル'); }()).to.equal('google');
  })
  it("辞書の単語をすべて置換して返す", function(){
    let d = new Dictionary(sid);
    var w = [['グーグル', 'google'], ['ギットハブ', 'GitHub']];
    expect(function (){ d.words = w; return d.replace('グーグル ギットハブ'); }()).to.equal('google GitHub');
  })
  it("複数回登場する単語も全て置換する", function(){
    let d = new Dictionary(sid);
    var w = [['グーグル', 'google'], ['ギットハブ', 'GitHub']];
    expect(function (){ d.words = w; return d.replace('グーグル ギットハブ グーグル'); }()).to.equal('google GitHub google');
  })

})

