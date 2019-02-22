"use strict";
var chai = require("chai");
var synth = require("../dist/index.js");
describe("examples", () => {
  it("simple oscillator", () => {
    var osc = new synth.Oscillator({ freq: 1 });
    chai.assert.typeOf(osc.tf(0), "number");
  });
});
