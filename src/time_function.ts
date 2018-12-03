export interface TFunc {
    (t: number): number
}

export interface TimeVariant {
    tf: TFunc
}

export class TConst implements TimeVariant {
    constructor(private value: number){}
    tf(_: number) { return this.value; }
}