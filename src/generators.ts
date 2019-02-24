import { AudioObject, toAudioObject } from './audio-object';

export interface OscillatorProps {
  frequency: number;
  phase?: AudioObject | number;
  amplitude?: AudioObject | number;
}

class GenericOsc implements AudioObject {
  protected frequency: number;
  protected amplitude: AudioObject;
  protected phase: AudioObject;
  constructor({ frequency, phase = 0, amplitude = 1 }: OscillatorProps) {
    this.frequency = frequency;
    this.amplitude = toAudioObject(amplitude);
    this.phase = toAudioObject(phase);
  }
  tf(_: number): number {
    throw new Error('Illegal tf call');
  }
}

export class Oscillator extends GenericOsc {
  tf(t: number): number {
    return (
      this.amplitude.tf(t) *
      Math.sin(2 * Math.PI * t * this.frequency + this.phase.tf(t))
    );
  }
}

export class Square extends GenericOsc {
  tf(t: number): number {
    return (
      this.amplitude.tf(t) *
      (Math.sin(2 * Math.PI * t * this.frequency + this.phase.tf(t)) > 0
        ? 1
        : -1)
    );
  }
}

export class Triangle extends GenericOsc {
  tf(t: number): number {
    let time = Math.asin(
      Math.sin(2 * Math.PI * this.frequency * t + this.phase.tf(t))
    );
    time /= Math.PI / 2;
    return time * this.amplitude.tf(t);
  }
}

export class Sawtooth extends GenericOsc {
  tf(t: number): number {
    return (
      -((2 * this.amplitude.tf(t)) / Math.PI) *
      Math.atan(
        1 /
          Math.tan(
            t * Math.PI * this.frequency + Math.PI / 2 + this.phase.tf(t) / 2
          )
      )
    );
  }
}

export class Noise implements AudioObject {
  protected amplitude: AudioObject;
  constructor(amplitude: number | AudioObject = 1) {
    this.amplitude = toAudioObject(amplitude);
  }
  tf(t: number): number {
    return this.amplitude.tf(t) * Math.random() * 2 - 1;
  }
}
