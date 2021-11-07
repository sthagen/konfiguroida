# API

The module exports two functions `cook` amd `partial`. The latter only to create specializations of the cooking.

## cook

Derive an array of objects from pairs that map population samples to distinct features.

The default (but optional) validation ensures:

*   population and pairs both are non-empty arrays
*   features are unique (first elements of pairs)
*   pairs second entries only provide members of population

### Parameters

*   `population` **[array][13]** array with all members of the population.
*   `sample` **[string][12]** key mapping to the sample from the population.
*   `feature` **[string][12]** key mapping to the feature variations.
*   `pairs` **[array][13]** pairs of features and array of samples (null for final pair).
*   `force` **bool** (false does / true does not) validate use. (optional, default `false`)

Returns **[array][13]** of objects that map population samples to distinct features.

## partial

Partially apply to a function the first argument and return specialization.

### Parameters

*   `func` **[function][11]** function to be specialized.
*   `first` **[string][12]** value to be fixed as first positional argument.

Returns **[function][11]** function with the first argument primed.

[11]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[12]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[13]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
