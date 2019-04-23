import { oscillator, distortion } from '../dist';

const o = oscillator({
  type: 'sine',
  frequency: 80,
  amplitude: oscillator({
    frequency: 2,
    phase: oscillator({
      amplitude: 10,
      frequency: 0.5
    })
  }),
  phase: oscillator({
    amplitude: oscillator({
      amplitude: 20,
      frequency: 0.1
    }),
    frequency: 100
  })
});

export const cool = distortion({
  signal: o,
  threshold: 0.7
});
