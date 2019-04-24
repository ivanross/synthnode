import 'mocha';
import { expect } from 'chai';
import { Add, add, isAdd, isAudioObject, isDelay } from '../dist';

describe('Add', () => {
  it('add constructor', () => {
    const a = add(1, 2);
    expect(isAdd(a)).to.be.true;
    expect(isAudioObject(a)).to.be.true;
    expect(isDelay(a)).to.be.false;
  });
});
