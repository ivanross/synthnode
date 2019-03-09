import { toAudioObject } from './audio-object';

export type DelayProps = {
  signal: AudioObject;
  ms: number | AudioObject;
};

export class Delay implements AudioObject {
  private signal: AudioObject;
  private ms: AudioObject;
  constructor({ signal, ms }: DelayProps) {
    this.signal = signal;
    this.ms = toAudioObject(ms);
  }
  tf(t: number) {
    return this.signal.tf(t - this.ms.tf(t));
  }
}
