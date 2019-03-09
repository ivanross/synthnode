import { toAudioObject } from './audio-object';

export type DelayProps = {
  signal: AudioObject;
  sec: number;
};

export class Delay implements AudioObject {
  private signal: AudioObject;
  private sec: number;
  constructor({ signal, sec: sec }: DelayProps) {
    this.signal = signal;
    this.sec = sec;
  }
  tf(t: number) {
    const actualTime = t - this.sec;
    if (actualTime < 0) return 0;
    return this.signal.tf(actualTime);
  }
}
