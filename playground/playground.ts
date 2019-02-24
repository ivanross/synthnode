/// <reference path="playground.d.ts" />
const Generator = require('audio-generator');
const Speaker = require('audio-speaker');
import { AudioObject, Add, Oscillator, Mult } from '../dist';

function play(osc: AudioObject) {
  const aux = (t: number) => [osc.tf(t)];
  return new Generator(aux, { duration: Infinity }).pipe(new Speaker());
}

const f = 440;

const organ = new Add([
  new Oscillator({ frequency: f, amplitude: 0.5 }),
  new Oscillator({ frequency: f * 2, amplitude: 0.2 }),
  new Oscillator({
    frequency: f * 3,
    amplitude: 0.15,
    phase: new Oscillator({ frequency: 7, amplitude: 1 })
  }),
  new Oscillator({ frequency: f * 4, amplitude: 0.1 }),
  new Oscillator({
    frequency: f * 5,
    amplitude: 0.55,
    phase: new Oscillator({ frequency: 5, amplitude: 1 })
  })
]);

play(organ);
