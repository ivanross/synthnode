import { Oscillator, Noise } from "./src/generators"
import { TConst } from "./src/time_function";

const o = new Oscillator({
    frequency: 220,
    amplitude: 1
});

console.log(o);

let ti = new TConst(5);
console.log(ti);

let noise = new Noise();

for (let i = 0; i < 10; i++) console.log(o.tf(i))