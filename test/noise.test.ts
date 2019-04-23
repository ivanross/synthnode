import 'mocha';
import { expect } from 'chai';
import { Noise, noise, isNoise, isAudioObject } from '../dist';

describe('Noise', () => {
  it('noise constructor', () => {
    expect(() => new Noise()).to.not.throw();
    expect(() => noise()).to.not.throw();
  });

  it('noise type guard', () => {
    expect(isNoise(new Noise())).to.be.true;
    expect(isNoise(noise())).to.be.true;
    expect(isAudioObject(noise())).to.be.true;
  });

  it('noise properties', () => {
    const n = noise();
    expect(n).to.have.property('amplitude');
    expect(n).to.have.property('tf');
  });

  it('amplitude', () => {
    const n = noise();
    expect(() => n.amplitude(0.5)).to.not.throw();
    expect(isAudioObject(n.amplitude())).to.be.true;
    expect(n.tf(0)).to.not.be.NaN;
    n.amplitude('hello world' as any);
    expect(n.tf(0)).to.be.NaN;
  });
});
