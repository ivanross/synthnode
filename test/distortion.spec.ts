import 'mocha';
import { expect } from 'chai';
import { Distortion, Oscillator } from '../dist';

describe('distortion', () => {
  it('distortion properties', () => {
    const dist = new Distortion({ signal: new Oscillator({ frequency: 0 }) });
    expect(dist).to.have.property('signal');
    expect(dist).to.have.property('threshold');
    expect(dist).to.have.property('type');
  });
});
