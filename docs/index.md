# konfiguroida

[![license](https://img.shields.io/github/license/sthagen/konfiguroida.svg?style=flat)](https://github.com/sthagen/konfiguroida/blob/default/LICENSE)
[![npm version](https://badge.fury.io/js/konfiguroida.svg)](https://www.npmjs.com/package/konfiguroida)
[![npm](https://img.shields.io/npm/dm/konfiguroida.svg)](https://www.npmjs.com/package/konfiguroida)

Confiture (Finnish konfiguroida) with whole fruits - data oriented programming for configuration and friends.

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

*   population and pairs both are non-empty arrays
*   features are unique (first elements of pairs)
*   pairs second entries only provide members of population

If any validation of those aspects fails, `cook` returns `undefined` as (error) value.

## Status

Experimental.

**Note**: The default branch is `default`.
