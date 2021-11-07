const { test } = require('uvu')
const assert = require('uvu/assert')
const { cook, partial } = require('../src/index')

test('partial', () => {
  const add = (x, y) => x + y
  const addTwo = partial(add, 2)
  assert.type(partial, 'function')
  assert.type(addTwo, 'function')
  assert.is(addTwo(1), 3)
})

test('cook empty population force', () => {
  // Some population to sample from:
  const FRUITS = []
  const what = cook(
    FRUITS,
    'fruits',
    'confiture',
    [[{size: 'XXS'}, ['currants']], [{size: 'XXL'}, null]],
    force=true
  )
  assert.equal(what, [
    {confiture: {size: 'XXS'}, fruits: ['currants']},
    {confiture: {size: 'XXL'}, fruits: []}
  ])
})

test('cook empty population validated', () => {
  // Some population to sample from:
  const FRUITS = []
  const what = cook(
    FRUITS,
    'fruits',
    'confiture',
    [[{size: 'XXS'}, ['currants']], [{size: 'XXL'}, null]]
  )
  assert.is(what, undefined)
})

test('example', () => {
  // Some population to sample from:
  const FRUITS = ['apples', 'currants', 'oranges', 'peaches', 'pears']

  // Preparing the kitchen for mapping feature variations to samples from a population:
  const cookFrom = partial(cook, FRUITS)
  const cookFromFruits = partial(cookFrom, 'fruits')
  const cookFromFruitsConfiture = partial(cookFromFruits, 'confiture')

  assert.type(cookFrom, 'function')
  assert.type(cookFromFruits, 'function')
  assert.type(cookFromFruitsConfiture, 'function')

  // Cook the confitures:
  const confitures = cookFromFruitsConfiture([[{size: 'XXS'}, ['currants']], [{size: 'XXL'}, null]])
  assert.equal(confitures, [
    {confiture: {size: 'XXS'}, fruits: ['currants']},
    {confiture: {size: 'XXL'}, fruits: ['apples', 'oranges', 'peaches', 'pears']}
  ])
})

test.run()
