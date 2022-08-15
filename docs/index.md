# Konfiguroida

Confiture (Finnish konfiguroida) with whole fruits - data oriented programming for configuration and friends.

[License: MIT](https://git.sr.ht/~sthagen/konfiguroida/tree/default/item/LICENSE)

[![npm version](https://badge.fury.io/js/konfiguroida.svg)](https://www.npmjs.com/package/konfiguroida)
[![npm](https://img.shields.io/npm/dm/konfiguroida.svg)](https://www.npmjs.com/package/konfiguroida)

## Bug Tracker

Feature requests and bug reports are bested entered in the [todos of konfiguroida](https://todo.sr.ht/~sthagen/konfiguroida).

## Primary Source repository

The primary source of `konfiguroida` lives somewhere on a mountain in Central Switzerland.
But, we use decentralized version control (git), so any clone can become the source to everyone's benefit, no central only code.
Anyway, the preferred public clones of `konfiguroida` are:

* [on codeberg](https://codeberg.org/sthagen/konfiguroida) - a democratic community-driven, non-profit software development platform operated by Codeberg e.V.
* [at sourcehut](https://git.sr.ht/~sthagen/konfiguroida) - a collection of tools useful for software development.

## Synopsis

```javascript
import cook from 'konfiguroida'
const FRUITS = ['apples', 'currants', 'oranges', 'peaches', 'pears']
const confitures = cook(
  FRUITS, 
  'fruits', 
  'confiture',
  [
    [{size: 'XXS'}, ['currants']], 
    [{size: 'XXL'}, null]
  ]
)
console.log(confitures)
//[
//  { confiture: { size: 'XXS' }, fruits: [ 'currants' ] },
//  {
//    confiture: { size: 'XXL' },
//    fruits: [ 'apples', 'oranges', 'peaches', 'pears' ]
//  }
//]

```

## Description

Configurations often map capabilities to sub sets from a population.

Konfiguroida fosters separation of data we can easily validate from code we can not as easily.

Software developers only have to list the smallest subsets and the cooking adds the rest.

In default mode (without setting the optional `force` parameter to `true`) the `cook` function validates these aspects:

*   population and pairs both are non-empty arrays of non-null values
*   features are unique (first elements of pairs)
*   pairs second entries only provide members of population

If any validation of those aspects fails, `cook` returns `undefined` as (error) value. 

**Note**: Null values will be cleansed from population per default.
