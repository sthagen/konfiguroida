/**
 * Returns a function with the first argument primed.
 * @param {function} func - function to be specialized.
 * @param {string} first - value to be fixed as first positional argument.
 */
const partial = (func, first) => {
  return (...rest) => {
    return func(first, ...rest)
  }
}

/**
 * Returns a function that creates a pair object.
 * @param {string} first - key mapping to the first positional value.
 * @param {string} second - key mapping to the second and last positional value.
 */
const zip_pair = (first, second) => {
  return (left, right) => ({[first]: left, [second]: right})
}

/**
 * Returns an array of objects that map population samples to distinct features.
 * @param {array} population - array with all members of the population.
 * @param {string} sample - key mapping to the sample from the population.
 * @param {string} feature - key mapping to the feature variations.
 * @param {array} pairs - pairs of features and array of samples (null for final pair).
 * @param {bool} force - (default false does / true does not) verify population use.
 */
const cook = (population, sample, feature, pairs, force=false) => {

  if (!force
      && (   !(population instanceof Array)
          || !population.length
          || !(pairs instanceof Array)
          || !pairs.length
      )
  ) return undefined  // population or pairs no arrays or empty

  derived = [...pairs]  // Create a copy of the pairs array

  if (!force) {
    const unique = []
    derived.forEach(pair => unique.indexOf(pair[0]) === -1
                            ? unique.push(pair[0])
                            : null
    )
    if (pairs.length !== unique.length) return undefined  // duplicate features
  }

  const used = []  // registry of used population members
  derived.forEach(pair => pair[1]
                          ? pair[1].forEach(e => used.push(e))
                          : null
  )

  const rest = population.filter(m => !used.includes(m))  // set difference

  const variation = derived[derived.length-1][0]
  derived[(derived.length - 1)] = [variation, rest]  // complete population

  const make = zip_pair(feature, sample)  // primed object creator
  derived.forEach((pair, i, seq) => seq[i] = make(...pair))

  return derived
}

module.exports = { cook: cook, partial: partial }
