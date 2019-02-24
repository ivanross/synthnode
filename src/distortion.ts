import { AudioObject, toAudioObject } from "./audio-object";

export interface DistortionProps {
    signal: AudioObject,
    threshold?: number | AudioObject
}

class Distortion implements AudioObject {
    protected signal: AudioObject
    protected threshold: AudioObject
    constructor({ signal, threshold = 1 }: DistortionProps) {
        this.signal = signal
        this.threshold = toAudioObject(threshold)
    }
    tf(_: number): number { throw new Error("Illefal tf call") }
}

export class Clip extends Distortion {
    tf(t: number): number {
        const tr = this.threshold.tf(t)
        const s = this.signal.tf(t)
        if (- tr <= s && s <= tr) return s
        if (s > tr) return tr
        return - tr
    }
}

export class Foldback extends Distortion {
    tf(t: number): number {
        const tr = this.threshold.tf(t)
        const s = this.signal.tf(t)
        if (-tr <= s && s <= tr) return s
        if (s > tr) return 2 * tr - s
        return - 2 * tr - s
    }
}

export class Overflow extends Distortion {
    tf(t: number): number {
        const tr = this.threshold.tf(t)
        const s = this.signal.tf(t)
        if (- tr <= s && s <= tr) return s
        if (s > tr) return - 2 * tr + s
        return 2 * tr - s
    }
}
