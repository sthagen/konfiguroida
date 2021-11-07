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
 *
 * The default (but optional) validation ensures:
 *
 * * population and pairs both are non-empty arrays
 * * features are unique (first elements of pairs)
 * * pairs second entries only provide members of population
 *
 * @param {array} population - array with all members of the population.
 * @param {string} sample - key mapping to the sample from the population.
 * @param {string} feature - key mapping to the feature variations.
 * @param {array} pairs - pairs of features and array of samples (null for final pair).
 * @param {bool} force - (default false does / true does not) validate use.
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
    const unique_features = []
    derived.forEach(pair => unique_features.indexOf(pair[0]) === -1
                            ? unique_features.push(pair[0])
                            : null
    )
    if (pairs.length !== unique_features.length) return undefined  // duplicates
  }

  const used = []  // registry of used population members
  derived.forEach(pair => pair[1]
                          ? pair[1].forEach(e => used.push(e))
                          : null
  )

  if (!force) {
      if (used.length > population.length) return undefined  // over population
      const aliens = []
      used.forEach(e => population.indexOf(e) === -1
                            ? aliens.push(e)
                            : null
      )
      if (aliens.length) return undefined  // non-members
  }

  const rest = population.filter(m => !used.includes(m))  // set difference

  const variation = derived[derived.length-1][0]
  derived[(derived.length - 1)] = [variation, rest]  // complete population

  const make = zip_pair(feature, sample)  // primed object creator
  derived.forEach((pair, i, seq) => seq[i] = make(...pair))

  return derived
}

module.exports = { cook: cook, partial: partial }
