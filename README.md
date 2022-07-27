# Konfiguroida

Confiture (Finnish konfiguroida) with whole fruits - data oriented programming for configuration and friends.

[License: MIT](https://git.sr.ht/~sthagen/konfiguroida/tree/default/item/LICENSE)

[![npm version](https://badge.fury.io/js/konfiguroida.svg)](https://www.npmjs.com/package/konfiguroida)
[![npm](https://img.shields.io/npm/dm/konfiguroida.svg)](https://www.npmjs.com/package/konfiguroida)

## Documentation

User and developer [documentation of konfiguroida](https://codes.dilettant.life/docs/konfiguroida).

## Bug Tracker

Feature requests and bug reports are bested entered in the [todos of konfiguroida](https://todo.sr.ht/~sthagen/konfiguroida).

## Primary Source repository

The primary source repository of [konfiguroida is at sourcehut](https://git.sr.ht/~sthagen/konfiguroida)
a collection of tools useful for software development.

## Installation

```console
# using npm
❯ npm install konfiguroida

# using yarn
❯ yarn add konfiguroida
```

## Usage

```js
// using require
const { cook, partial } = require('konfiguroida')

// using import
import { cook, partial } from 'konfiguroida'
```

## Example

```js
// Some population to sample from:
const FRUITS = ['apples', 'currants', 'oranges', 'peaches', 'pears']

// Preparing the kitchen for cooking confitures from diverse fruits:
const cookFrom = partial(cook, FRUITS)
const cookFromFruits = partial(cookFrom, 'fruits')
const cookFromFruitsConfiture = partial(cookFromFruits, 'confiture')

// Cook the confitures:
const confitures = cookFromFruitsConfiture([
  [{size: 'XXS'}, ['currants']], 
  [{size: 'XXL'}, null]
])
console.log(confitures)
//[
//  { confiture: { size: 'XXS' }, fruits: [ 'currants' ] },
//  {
//    confiture: { size: 'XXL' },
//    fruits: [ 'apples', 'oranges', 'peaches', 'pears' ]
//  }
//]
```

## Status

Experimental.

**Note**: The default branch is `default`.
