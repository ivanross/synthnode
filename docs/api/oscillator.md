# Oscillator

**Signature**:

```ts
class Oscillator implements AudioObject { ... }
```

**Constructor**:

```ts
function oscillator(options): Oscillator;
```

**Options**:

| option      | type                    | default        |
| ----------- | ----------------------- | -------------- |
| `frequency` | `number`                | **_required_** |
| `amplitude` | `number \| AudioObject` | `1`            |
| `phase`     | `number \| AudioObject` | `0`            |
| `type`      | `OscillatorType`        | `sine`         |

**Oscillator types**:

```ts
type OscillatorType = 'sine' | 'square' | 'triangle' | 'sawthoot';
```
