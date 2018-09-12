import chai from 'chai';
import {expect} from 'chai';
import sinon from 'sinon';
require("../src/twitter");
// 環境依存なのでテストできない 

describe("apiKey", function(){
  it("関数が定義されている", function(){
    expect(apiKey).to.be.a('function');
  })
})

describe("apiSecret", function(){
  it("関数が定義されている", function(){
    expect(apiSecret).to.be.a('function');
  })
})

describe("getService", function(){
  it("関数が定義されている", function(){
    expect(getService).to.be.a('function');
  })
})

describe("reset", function(){
  it("関数が定義されている", function(){
    expect(reset).to.be.a('function');
  })
})
describe("authorize", function(){
  it("関数が定義されている", function(){
    expect(authorize).to.be.a('function');
  })
})
describe("authCallback", function(){
  it("関数が定義されている", function(){
    expect(authCallback).to.be.a('function');
  })
})
describe("postUpdateStatus", function(){
  it("関数が定義されている", function(){
    expect(postUpdateStatus).to.be.a('function');
  })
})
