import { AudioObject, toAudioObject } from './audio-object';
const { sin, PI, asin, atan, tan } = Math;

export type OscillatorType = 'sine' | 'square' | 'triangle' | 'sawthoot';
export type OscillatorOptions = {
  frequency: number;
  phase?: AudioObject | number;
  amplitude?: AudioObject | number;
  type?: OscillatorType;
};

export class Oscillator implements AudioObject {
  private _frequency: number;
  private _amplitude: AudioObject;
  private _phase: AudioObject;
  private _type: OscillatorType;
  constructor({
    frequency,
    phase = 0,
    amplitude = 1,
    type = 'sine'
  }: OscillatorOptions) {
    this._frequency = frequency;
    this._amplitude = toAudioObject(amplitude);
    this._phase = toAudioObject(phase);
    this._type = type;
  }

  frequency(): number;
  frequency(value: number): void;
  frequency(value?: number): any {
    if (value === undefined) return this._frequency;
    this._frequency = value;
  }

  amplitude(): AudioObject;
  amplitude(value: number | AudioObject): void;
  amplitude(value?: number | AudioObject): any {
    if (value === undefined) return this._amplitude;
    this._amplitude = toAudioObject(value);
  }

  phase(): AudioObject;
  phase(value: number | AudioObject): void;
  phase(value?: number | AudioObject): any {
    if (value === undefined) return this._phase;
    this._phase = toAudioObject(value);
  }

  type(): OscillatorType;
  type(value: OscillatorType): void;
  type(value?: OscillatorType): any {
    if (value === undefined) return this._type;
    this._type = value;
  }

  tf(t: number): number {
    if (this._type === 'sine') {
      return (
        this._amplitude.tf(t) *
        sin(2 * PI * t * this._frequency + this._phase.tf(t))
      );
    }
    if (this._type === 'square') {
      return (
        this._amplitude.tf(t) *
        (sin(2 * PI * t * this._frequency + this._phase.tf(t)) > 0 ? 1 : -1)
      );
    }
    if (this._type === 'triangle') {
      let time = asin(sin(2 * PI * this._frequency * t + this._phase.tf(t)));
      time /= PI / 2;
      return time * this._amplitude.tf(t);
    }

    if (this._type === 'sawthoot') {
      return (
        -((2 * this._amplitude.tf(t)) / PI) *
        atan(1 / tan(t * PI * this._frequency + PI / 2 + this._phase.tf(t) / 2))
      );
    }
    throw new Error('Oscillator type not recognized');
  }
}

export function isOscillator(x: any): x is Oscillator {
  return x instanceof Oscillator;
}

export function oscillator(options: OscillatorOptions): Oscillator {
  return new Oscillator(options);
}
