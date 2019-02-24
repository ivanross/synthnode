import { sum } from 'lodash';
import { AudioObject, toAudioObject } from './audio-object';

export class Add {
  private values: AudioObject[];
  constructor(values: (number | AudioObject)[]) {
    this.values = values.map(toAudioObject);
  }
  tf(t: number): number {
    return sum(this.values.map(v => v.tf(t)));
  }
}

export class Mult {
  private a: AudioObject;
  private b: AudioObject;
  constructor(a: number | AudioObject, b: number | AudioObject) {
    this.a = toAudioObject(a);
    this.b = toAudioObject(b);
  }
  tf(t: number): number {
    return this.a.tf(t) * this.b.tf(t);
  }
}
