export type TimeFunc = (time: number) => number;

export type AudioObject = {
  tf: TimeFunc;
};

export class Value implements AudioObject {
  constructor(private value: number) {}
  tf() {
    return this.value;
  }
}

export function isAudioObject(x: any): x is AudioObject {
  return (<AudioObject>x).tf !== undefined;
}

export function toAudioObject(noa: number | AudioObject): AudioObject {
  return isAudioObject(noa) ? <AudioObject>noa : new Value(<number>noa);
}
