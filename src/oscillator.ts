import { AudioObject, toAudioObject } from './audio-object';
const { sin, PI, asin, atan, tan } = Math;

export type OscillatorType = 'sine' | 'square' | 'triangle' | 'sawthoot';
export type OscillatorProps = {
  frequency: number;
  phase?: AudioObject | number;
  amplitude?: AudioObject | number;
  type?: OscillatorType;
};

export class Oscillator implements AudioObject {
  private frequency: number;
  private amplitude: AudioObject;
  private phase: AudioObject;
  private type: OscillatorType;
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
  setFrequency(value: number) {
    this.frequency = value;
  }
  setAmplitude(value: number | AudioObject) {
    this.amplitude = toAudioObject(value);
  }
  setPhase(value: number | AudioObject) {
    this.phase = toAudioObject(value);
  }
  setType(value: OscillatorType) {
    this.type = value;
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