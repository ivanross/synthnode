import { toAudioObject } from './audio-object';

export class Noise implements AudioObject {
  private amplitude: AudioObject;
  constructor(amplitude: number | AudioObject = 1) {
    this.amplitude = toAudioObject(amplitude);
  }
  setAmplitude(value: number) {
    this.amplitude = toAudioObject(value);
  }
  tf(t: number): number {
    return this.amplitude.tf(t) * Math.random() * 2 - 1;
  }
}
