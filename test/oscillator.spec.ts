import 'mocha';
import { expect } from 'chai';
import { Oscillator, Noise } from '../dist';

describe('oscillators', () => {
  it('test oscillator properties', () => {
    const osc = new Oscillator({ frequency: 1 });
    expect(osc).to.have.property('frequency');
    expect(osc).to.have.property('amplitude');
    expect(osc).to.have.property('phase');
    expect(osc).to.have.property('type');
    expect(osc).to.have.property('tf');
  });

  it('test oscillator modif', () => {});
});

describe('noise', () => {
  it('test noise properties', () => {
    const n = new Noise();
    expect(n).to.have.property('amplitude');
    expect(n).to.have.property('tf');
  });
});
