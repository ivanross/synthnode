import { AudioObject, toAudioObject } from './audio-object';
const { sin, PI, asin, atan, tan, random } = Math;

export type OscillatorType = 'sine' | 'square' | 'triangle' | 'sawthoot';
export type OscillatorProps = {
  frequency: number;
  phase?: AudioObject | number;
  amplitude?: AudioObject | number;
  type?: OscillatorType;
};

export class Oscillator implements AudioObject {
  frequency: number;
  amplitude: AudioObject;
  phase: AudioObject;
  type: OscillatorType;
  constructor({
    frequency,
    phase = 0,
    amplitude = 1,
    type = 'sine'
  }: OscillatorProps) {
    this.frequency = frequency;
    this.amplitude = toAudioObject(amplitude);
    this.phase = toAudioObject(phase);
    this.type = type;
  }

  tf(t: number): number {
    switch (this.type) {
      case 'sine':
        return (
          this.amplitude.tf(t) *
          sin(2 * PI * t * this.frequency + this.phase.tf(t))
        );
      case 'square':
        return (
          this.amplitude.tf(t) *
          (sin(2 * PI * t * this.frequency + this.phase.tf(t)) > 0 ? 1 : -1)
        );
      case 'triangle':
        let time = asin(sin(2 * PI * this.frequency * t + this.phase.tf(t)));
        time /= PI / 2;
        return time * this.amplitude.tf(t);
      case 'sawthoot':
        return (
          -((2 * this.amplitude.tf(t)) / PI) *
          atan(1 / tan(t * PI * this.frequency + PI / 2 + this.phase.tf(t) / 2))
        );
      default:
        throw new Error('Oscillator type not recognized');
    }
  }
}

export class Noise implements AudioObject {
  amplitude: AudioObject;
  constructor(amplitude: number | AudioObject = 1) {
    this.amplitude = toAudioObject(amplitude);
  }
  tf(t: number): number {
    return this.amplitude.tf(t) * random() * 2 - 1;
  }
}
