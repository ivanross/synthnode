import { sum } from 'lodash';
import { AudioObject, toAudioObject } from './audio-object';

export class Add implements AudioObject {
  private _a: AudioObject;
  private _b: AudioObject;

  constructor(a: number | AudioObject, b: number | AudioObject) {
    this._a = toAudioObject(a);
    this._b = toAudioObject(b);
  }

  a(): AudioObject;
  a(value: number | AudioObject): void;
  a(value?: number | AudioObject): any {
    if (value === undefined) return this._a;
    this._a = toAudioObject(value);
  }

  b(): AudioObject;
  b(value: number | AudioObject): void;
  b(value?: number | AudioObject): any {
    if (value === undefined) return this._b;
    this._b = toAudioObject(value);
  }

  tf(t: number): number {
    return this._a.tf(t) + this._b.tf(t);
  }
}

export function isAdd(x: any): x is Add {
  return x instanceof Add;
}

export function add(a: number | AudioObject, b: number | AudioObject): Add {
  return new Add(a, b);
}

export class Mult implements AudioObject {
  private _a: AudioObject;
  private _b: AudioObject;
  constructor(a: number | AudioObject, b: number | AudioObject) {
    this._a = toAudioObject(a);
    this._b = toAudioObject(b);
  }

  a(): AudioObject;
  a(value: number | AudioObject): void;
  a(value?: number | AudioObject): any {
    if (value === undefined) return this._a;
    this._a = toAudioObject(value);
  }

  b(): AudioObject;
  b(value: number | AudioObject): void;
  b(value?: number | AudioObject): any {
    if (value === undefined) return this._b;
    this._b = toAudioObject(value);
  }

  tf(t: number): number {
    return this._a.tf(t) * this._b.tf(t);
  }
}

export function isMult(x: any): x is Mult {
  return x instanceof Add;
}

export function mult(a: number | AudioObject, b: number | AudioObject): Mult {
  return new Mult(a, b);
}
