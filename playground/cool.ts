import { Oscillator, Distortion } from '../dist';

const o = new Oscillator({
  type: 'sine',
  frequency: 80,
  amplitude: new Oscillator({
    frequency: 2,
    phase: new Oscillator({
      amplitude: 10,
      frequency: 0.5
    })
  }),
  phase: new Oscillator({
    amplitude: new Oscillator({
      amplitude: 20,
      frequency: 0.1
    }),
    frequency: 100
  })
});

export const cool = new Distortion({
  signal: o,
  threshold: 0.7
});
