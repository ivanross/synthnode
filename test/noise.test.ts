import 'mocha';
import { expect } from 'chai';
import { Noise } from '../dist';

describe('noise', () => {
  it('noise properties', () => {
    const n = new Noise();
    expect(n).to.have.property('amplitude');
    expect(n).to.have.property('tf');
  });

  it('amplitude changes', () => {
    const n = new Noise();
    expect(() => n.amplitude(0.5)).to.not.throw();
    expect(n.tf(0)).to.not.be.NaN;
    n.amplitude('ciao' as any);
    expect(n.tf(0)).to.be.NaN;
  });
});
