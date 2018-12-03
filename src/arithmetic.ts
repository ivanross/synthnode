import { AudioObject, toAudioObject } from "./audio-object";

class AOArithmetic implements AudioObject {
    protected a: AudioObject
    protected b: AudioObject
    constructor(a: number | AudioObject, b: number | AudioObject) {
        this.a = toAudioObject(a)
        this.b = toAudioObject(b)
    }
    tf(_: number): number { throw new Error("Illegal tf call") }
}

export class AOAdd extends AOArithmetic {
    tf(t: number): number { return this.a.tf(t) + this.b.tf(t) }
}
export class AOMult extends AOArithmetic {
    tf(t: number): number { return this.a.tf(t) * this.b.tf(t) }
}