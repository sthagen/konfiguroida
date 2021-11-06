# API

## partial

 * Returns an function with the first argument primed.
 * @param {function} func - The function the following parameter is applied to as first argument.
 * @param {string} first - The value to be fixed as first argument.

```javascript
const partial = (func, first) => {
  return (...rest) => {
    return func(first, ...rest)
  }
}
```

## cook

 * Returns an array of objects that map population samples to distinct features.
 * @param {array} population - The array with all members of the population.
 * @param {string} sample - The key mapping to the sample from the population.
 * @param {string} feature - The key mapping to the feature variations.
 * @param {array} pairs - Pairs of features and either an array of samples or null for the last pair.

```javascript
const cook = (population, sample, feature, pairs) => {
  derived = [...pairs]  // Create a copy of the pairs array

  const used = []  // registry of used population members
  derived.forEach(pair => pair[1] ? pair[1].forEach(entry => used.push(entry)) : null)

  const rest = population.filter(member => !used.includes(member))  // naive set difference

  const variation = derived.at(-1)[0]
  derived[(derived.length - 1)] = [variation, rest]  // complete population

  const make = pairZip(feature, sample)  // primed object creator
  derived.forEach((pair, index, seq) => seq[index] = make(...pair))

  return derived
}
```
