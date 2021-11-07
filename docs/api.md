# API

The module exports two functions `cook` amd `partial`. The latter to create specializations of the cooking.

## cook

Returns an array of objects that map population samples to distinct features.

### parameters

* {array} population - array with all members of the population.
* {string} sample - key mapping to the sample from the population.
* {string} feature - key mapping to the feature variations.
* {array} pairs - pairs of features and array of samples (null for final pair).

```javascript
const cook = (population, sample, feature, pairs) => {
  derived = [...pairs]  // Create a copy of the pairs array

  const used = []  // registry of used population members
  derived.forEach(pair => pair[1] ? pair[1].forEach(e => used.push(e)) : null)

  const rest = population.filter(m => !used.includes(m))  // naive set difference

  const variation = derived[derived.length-1][0]
  derived[(derived.length - 1)] = [variation, rest]  // complete population

  const make = pairZip(feature, sample)  // primed object creator
  derived.forEach((pair, i, seq) => seq[i] = make(...pair))

  return derived
}
```

## partial

Returns a function with the first argument primed.

### parameters

* {function} func - function to be specialized.
* {string} first - value to be fixed as first positional argument.

```javascript
const partial = (func, first) => {
  return (...rest) => {
    return func(first, ...rest)
  }
}
```
