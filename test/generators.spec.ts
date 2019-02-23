import "mocha";
import { assert } from "chai";
import { Oscillator, Square } from "../dist/generators";

describe("oscillator", () => {
  it("simple oscillator", () => {
    var osc = new Oscillator({ frequency: 1 });
    assert.typeOf(osc.tf(0), "number");
  });
});

describe("square", () => {
  it("simple square", () => {
    var osc = new Square({ frequency: 1 });
    assert.typeOf(osc.tf(0), "number");
  });
});
