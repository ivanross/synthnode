export interface TimeFunc {
    (time: number): number
}

export interface AudioObject {
    tf: TimeFunc
}

export class AOConst implements AudioObject {
    constructor(private value: number) { }
    tf(_: number) { return this.value; }
}

export function toAudioObject(noa: number | AudioObject): AudioObject {
    return (<AudioObject>noa).tf ? <AudioObject>noa : new AOConst(<number>noa);
}
