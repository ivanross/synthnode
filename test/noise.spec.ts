import 'mocha';
import { expect } from 'chai';
import { Noise } from '../dist';

describe('noise', () => {
  it('test noise properties', () => {
    const n = new Noise();
    expect(n).to.have.property('amplitude');
    expect(n).to.have.property('tf');
  });
});
