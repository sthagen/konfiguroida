# Developer API

## partial

Partially apply to a function the first argument and return specialization.

### Parameters

*   `func` **[function][11]** function to be specialized.
*   `first` **[string][12]** value to be fixed as first positional argument.

Returns **[function][11]** function with the first argument primed.

## zip_pair

Create zipper for pairs that creates a pair object given two parameters.

### Parameters

*   `first` **[string][12]** key mapping to the first positional value.
*   `second` **[string][12]** key mapping to the second and last positional value.

Returns **[function][11]** that creates a pair object.

## deep_equal

We invented a wheel again - hooray

### Parameters

*   `me` **any** maybe an object.
*   `you` **any** maybe an object.

Returns **bool** true if deeply equal.

## is_object

We invented another wheel again - hip, hip, hooray

### Parameters

*   `thing` **any** maybe an object.

Returns **bool** true if given an object.

## cook

Derive an array of objects from pairs that map population samples to distinct features.

The default (but optional) validation ensures:

*   population and pairs both are non-empty arrays of non-null values
*   features are unique (first elements of pairs)
*   pairs second entries only provide members of population

### Parameters

*   `population` **[array][13]** array with all members of the population.
*   `sample` **[string][12]** key mapping to the sample from the population.
*   `feature` **[string][12]** key mapping to the feature variations.
*   `pairs` **[array][13]** pairs of features and array of samples (null for final pair).
*   `force` **bool** (false does / true does not) validate use. (optional, default `false`)

Returns **[array][13]** of objects that map population samples to distinct features.

[11]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[12]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[13]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
