# SynthNode

[![Build Status](https://travis-ci.com/ivanross/synthnode.svg?branch=master)](https://travis-ci.com/ivanross/synthnode)
[![npm version](https://img.shields.io/npm/v/synthnode.svg)](https://www.npmjs.com/package/synthnode)
[![Greenkeeper badge](https://badges.greenkeeper.io/ivanross/synthnode.svg)](https://greenkeeper.io/)

`synthnode` is a simple typescript library for audio synthesis. This project is a personal experiment.

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Example](#example)
- [Core Concepts](#core-concepts)
- [API](#api)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

```sh
npm install --save synthnode
```

## Example

```ts
import { oscillator } from 'synthnode';
import { mono } from '@synthnode/util';

const o = oscillator({
  frequency: 80,
  amplitude: oscillator({
    frequency: 2,
    phase: oscillator({
      frequency: 0.5
      amplitude: 10,
    })
  }),
  phase: oscillator({
    frequency: 100
    amplitude: oscillator({
      frequency: 0.1
      amplitude: 20,
    }),
  })
});

mono(o);
```

## Core Concepts

This library provides a collection of **Audio Objects**. Those can be linked to create complex nets. An Audio Object is an object with `tf` (i.e. **time-function**) method, that takes the time of execution (in seconds) as a parameter and returns a numeric value, so its signature is:

```ts
type AudioObject = {
  tf(time: number): number;
};
```

Among others, `Oscillator` is an example of Audio Object. The values returned by its time-function represents audio samples. As can be seen from the [example](#example) above, multiple oscillators can be combined by passing them as contructor options.

## API

- [Oscillator](docs/api/oscillator.md)

## License

The MIT License (MIT)
