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

The primary source of `konfiguroida` lives somewhere on a mountain in Central Switzerland.
But, we use decentralized version control (git), so any clone can become the source to everyone's benefit, no central only code.
Anyway, the preferred public clones of `konfiguroida` are:

* [on codeberg](https://codeberg.org/sthagen/konfiguroida) - a collaboration platform and git hosting for free and open source software, content and projects.
* [at sourcehut](https://git.sr.ht/~sthagen/konfiguroida) - a collection of tools useful for software development.

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
