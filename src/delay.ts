import { AudioObject } from './audio-object';

export type DelayOptions = {
  signal: AudioObject;
  sec: number;
};

export class Delay implements AudioObject {
  private _signal: AudioObject;
  private _seconds: number;
  constructor({ signal, sec }: DelayOptions) {
    this._signal = signal;
    this._seconds = sec;
  }

  signal(): AudioObject;
  signal(value: AudioObject): void;
  signal(value?: AudioObject): any {
    if (value === undefined) return this._signal;
    this._signal = value;
  }

  seconds(): number;
  seconds(value: number): void;
  seconds(value?: number): any {
    if (value === undefined) return this._seconds;
    this._seconds = value;
  }

  tf(t: number) {
    const actualTime = t - this._seconds;
    if (actualTime < 0) return 0;
    return this._signal.tf(actualTime);
  }
}
