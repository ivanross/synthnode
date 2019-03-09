export type TimeFunc = (time: number) => number;

export type AudioObject = {
  tf: TimeFunc;
};

export class AOConst implements AudioObject {
  constructor(private value: number) {}
  tf() {
    return this.value;
  }
}

export function toAudioObject(noa: number | AudioObject): AudioObject {
  return (<AudioObject>noa).tf ? <AudioObject>noa : new AOConst(<number>noa);
}
