/// <reference path="playground.d.ts" />
const Generator = require('audio-generator');
const Speaker = require('audio-speaker');
import { Add, Oscillator, Mult, Delay } from '../dist';
import { cool } from './cool';

function play(osc: any) {
  const aux = (t: number) => [osc.tf(t)];
  return new Generator(aux, { duration: Infinity }).pipe(new Speaker());
}

let delayed = new Add([cool, new Delay({ signal: cool, sec: 1 })]);

let gained = new Mult(delayed, 0.5);

play(gained);
