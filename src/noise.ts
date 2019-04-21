import { AudioObject, toAudioObject } from './audio-object';

export class Noise implements AudioObject {
  private _amplitude: AudioObject;
  constructor(amplitude: number | AudioObject = 1) {
    this._amplitude = toAudioObject(amplitude);
  }

  amplitude(): AudioObject;
  amplitude(value: number | AudioObject): void;
  amplitude(value?: number | AudioObject): any {
    if (value === undefined) return this._amplitude;
    this._amplitude = toAudioObject(value);
  }
  tf(t: number): number {
    return this._amplitude.tf(t) * Math.random() * 2 - 1;
  }
}
