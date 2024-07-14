"use strict";

const { chai } = require("../test-helper");


describe("Example Test Case", function() {
  let expect;

  before(async function() {
    expect = (await chai()).expect;
  });

  it("should assert that true is true", function() {
    expect(true).to.equal(true);
  });
});
