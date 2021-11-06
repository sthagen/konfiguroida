# konfiguroida

Confiture (Finnish konfiguroida) with whole fruits - data oriented programming for configuration and friends.

## Installation

```js
# using npm
npm install konfiguroida

# using yarn
yarn add konfiguroida
```

## Usage

```js
# using require
const { cook, partial } = require('konfiguroida')

# using import
import { cook, partial } from 'konfiguroida'
```

## Example


```js
// Some population to sample from:
const FRUITS = ['apples', 'currants', 'oranges', 'peaches', 'pears']

// Preparing the kitchen for mapping feature variations to samples from a population:
const cookFrom = partial(cook, FRUITS)
const cookFromFruits = partial(cookFrom, 'fruits')
const cookFromFruitsConfiture = partial(cookFromFruits, 'confiture')

// Cook the confitures:
const confitures = cookFromFruitsConfiture([[{size: 'XXS'}, ['currants']], [{size: 'XXL'}, null]])
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
