# SynthNode

[![Build Status](https://travis-ci.com/ivanross/synthnode.svg?branch=master)](https://travis-ci.com/ivanross/synthnode)
[![npm version](https://img.shields.io/npm/v/synthnode.svg)](https://www.npmjs.com/package/synthnode)
[![Greenkeeper badge](https://badges.greenkeeper.io/ivanross/synthnode.svg)](https://greenkeeper.io/)

`synthnode` is a simple typescript library for audio synthesis. This project is a personal experiment. The main aim is to have a flexible API.

# Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Core Concepts](#core-concepts)
  - [`AudioObject`](#audioobject)
- [Examples](#examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

```
npm install --save synthnode
```

or if using yarn:

```
yarn add --save synthnode
```

# Core Concepts

## `AudioObject`

```ts
type AudioObject = {
  tf(time: number): number;
};
```

# Examples

```ts
import { oscillator, Oscillator } from 'synthnode';

const o1: Oscillator = oscillator({ frequrency: 440 });
```
