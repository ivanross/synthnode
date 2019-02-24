import { AudioObject } from './audio-object';

export class Expose implements AudioObject {
  constructor(public value: number) {}
  tf() {
    return this.value;
  }
}
