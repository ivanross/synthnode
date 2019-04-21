import { AudioObject, toAudioObject } from './audio-object';

export type DistortionType = 'clip' | 'foldback' | 'overflow';
export type DistortionOptions = {
  signal: AudioObject;
  threshold?: number | AudioObject;
  type?: DistortionType;
};

export class Distortion implements AudioObject {
  private _signal: AudioObject;
  private _threshold: AudioObject;
  private _type: DistortionType;
  constructor({ signal, threshold = 1, type = 'clip' }: DistortionOptions) {
    this._signal = signal;
    this._threshold = toAudioObject(threshold);
    this._type = type;
  }

  signal(): AudioObject;
  signal(value: AudioObject): void;
  signal(value?: AudioObject): any {
    if (value === undefined) return this._signal;
    this._signal = value;
  }

  threshold(): AudioObject;
  threshold(value: number | AudioObject): void;
  threshold(value?: number | AudioObject): any {
    if (value === undefined) return this._threshold;
    this._threshold = toAudioObject(value);
  }

  type(): DistortionType;
  type(value: DistortionType): void;
  type(value?: DistortionType): any {
    if (value === undefined) return this._type;
    this._type = value;
  }

  tf(t: number): number {
    const tr = this._threshold.tf(t);
    const s = this._signal.tf(t);
    if (this._type === 'clip') {
      if (-tr <= s && s <= tr) return s;
      if (s > tr) return tr;
      return -tr;
    }
    if (this._type === 'foldback') {
      if (-tr <= s && s <= tr) return s;
      if (s > tr) return 2 * tr - s;
      return -2 * tr - s;
    }
    if (this._type === 'overflow') {
      if (-tr <= s && s <= tr) return s;
      if (s > tr) return 2 * tr - s;
      return -2 * tr - s;
    }
    throw new Error('Distortion type not recognized');
  }
}
