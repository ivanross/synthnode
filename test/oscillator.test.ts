import 'mocha';
import { expect } from 'chai';
import { Oscillator } from '../dist';

describe('oscillators', () => {
  it('oscillator properties', () => {
    const osc = new Oscillator({ frequency: 1 });
    expect(osc).to.have.property('frequency');
    expect(osc).to.have.property('amplitude');
    expect(osc).to.have.property('phase');
    expect(osc).to.have.property('type');
    expect(osc).to.have.property('tf');
  });

  it('type changes', () => {
    const osc = new Oscillator({ frequency: 1 });
    osc.type('sawthoot');
    expect(() => osc.tf(0)).to.not.throw();
    osc.type('square');
    expect(() => osc.tf(0)).to.not.throw();
    osc.type('triangle');
    expect(() => osc.tf(0)).to.not.throw();
    osc.type('sine');
    expect(() => osc.tf(0)).to.not.throw();
    osc.type('ciao' as any);
    expect(() => osc.tf(0)).to.throw();
  });
});
