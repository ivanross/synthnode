import { Oscillator, Noise, Triangle, Sawtooth, Square } from "./src/generators"
import { AOConst, AudioObject } from "./src/audio-object";
import { AOAdd } from "./src/arithmetic";
import { Clip, Overflow } from "./src/distortion";

const o = new Oscillator({
    frequency: 220,
    amplitude: 1,
    phase: new Triangle({
        frequency: 2,
        amplitude: new Square({
            frequency: 0.2,
            amplitude: 25
        })
    })
});

// console.log(o);


// for (let i = 0; i < 6; i++) console.log(o.tf(i))

// const added = new AOAdd(o, 2)
// for (let i = 0; i < 6; i++) console.log(added.tf(i))

// console.log(added)

const a = new Overflow({
    threshold: 0.3,
    signal: new Oscillator({
        frequency: 100
    })
})

for(var i = 0; i < 200; i++) console.log(a.tf(i/4410))