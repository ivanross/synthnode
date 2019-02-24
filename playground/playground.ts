/// <reference path="playground.d.ts" />
const Generator = require('audio-generator');
const Speaker = require('audio-speaker');
import { AudioObject, Oscillator } from '../src';

function play(osc: AudioObject) {
  const aux = (t: number) => [osc.tf(t)];
  return new Generator(aux, { duration: Infinity }).pipe(new Speaker());
}

let o = new Oscillator({
  type: 'square',
  frequency: 80,
  amplitude: new Oscillator({
    frequency: 2,
    phase: new Oscillator({
      amplitude: 10,
      frequency: 0.5
    })
  }),
  phase: new Oscillator({
    amplitude: new Oscillator({
      amplitude: 20,
      frequency: 0.1
    }),
    frequency: 100
  })
});

play(o);
setTimeout(() => {
  o.frequency = 800;
  console.log('freq changed');
}, 2000);
