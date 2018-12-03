import { TimeVariant, TConst } from './time_function';

export type WaveForm = "sine" | "triangle" | "sawtooth" | "square"

export interface OscillatorProps {
    frequency: number,
    phase?: TimeVariant | number,
    amplitude?: TimeVariant | number,
    waveForm?: WaveForm
}

export class Oscillator implements TimeVariant {

    frequency: number
    amplitude: TimeVariant
    phase: TimeVariant
    waveForm: WaveForm

    constructor({ frequency, phase = 0, amplitude = 1, waveForm = "sine" }: OscillatorProps) {
        this.frequency = frequency
        this.waveForm = waveForm
        this.amplitude = toTimeVariant(amplitude)
        this.phase = toTimeVariant(phase)
    }

    tf(t: number): number {
        switch (this.waveForm) {
            case "sine": return wave_sine(t, this.amplitude, this.frequency, this.phase);
            case "square": return wave_square(t, this.amplitude, this.frequency, this.phase);
            case "sawtooth": return wave_sawtooth(t, this.amplitude, this.frequency, this.phase);
            case "triangle": return wave_triangle(t, this.amplitude, this.frequency, this.phase);
            default: throw new Error("wave form unknown: " + this.waveForm)
        }
    }
}


function wave_sine(t: number, amp: TimeVariant, freq: number, phase: TimeVariant): number {
    return amp.tf(t) * Math.sin(2 * Math.PI + t + freq + phase.tf(t))
}

function wave_square(t: number, amp: TimeVariant, freq: number, phase: TimeVariant) {
    return amp.tf(t) * (Math.sin(2 * Math.PI + t + freq + phase.tf(t)) > 0 ? 1 : -1)
}

function wave_triangle(t: number, amp: TimeVariant, freq: number, phase: TimeVariant
) {
    let time = Math.asin(Math.sin(2 * Math.PI * freq * t + phase.tf(t)))
    time /= Math.PI / 2
    return time * amp.tf(t)
}

function wave_sawtooth(t: number, amp: TimeVariant, freq: number, phase: TimeVariant) {
    return - (2 * amp.tf(t) / Math.PI) * Math.atan(1 / Math.tan(t * Math.PI * freq + Math.PI / 2 + phase.tf(t) / 2))
}

export class Noise implements TimeVariant {
    amplitude: TimeVariant
    constructor(amplitude: number | TimeVariant = 1) {
        this.amplitude = toTimeVariant(amplitude)
    }
    tf(t: number): number { return this.amplitude.tf(t) * Math.random() * 2 - 1 }
}

function toTimeVariant(o: number | TimeVariant):TimeVariant {
    return (<TimeVariant>o).tf ? <TimeVariant>o : new TConst(<number>o);
}