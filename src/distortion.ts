import { AudioObject, toAudioObject } from './audio-object';

export type DistortionType = 'clip' | 'foldback' | 'overflow';
export type DistortionProps = {
  signal: AudioObject;
  threshold?: number | AudioObject;
  type?: DistortionType;
};

export class Distortion implements AudioObject {
  private signal: AudioObject;
  private threshold: AudioObject;
  private type: DistortionType;
  constructor({ signal, threshold = 1, type = 'clip' }: DistortionProps) {
    this.signal = signal;
    this.threshold = toAudioObject(threshold);
    this.type = type;
  }
  tf(t: number): number {
    const tr = this.threshold.tf(t);
    const s = this.signal.tf(t);
    if (this.type === 'clip') {
      if (-tr <= s && s <= tr) return s;
      if (s > tr) return tr;
      return -tr;
    }
    if (this.type === 'foldback') {
      if (-tr <= s && s <= tr) return s;
      if (s > tr) return 2 * tr - s;
      return -2 * tr - s;
    }
    if (this.type === 'overflow') {
      if (-tr <= s && s <= tr) return s;
      if (s > tr) return 2 * tr - s;
      return -2 * tr - s;
    }
    throw new Error('Distortion type not recognized');
  }
}
