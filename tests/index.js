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
  const FRUITS = []
  const what = cook(
    FRUITS,
    'fruits',
    'confiture',
    [[{size: 'XXS'}, ['currants']], [{size: 'XXL'}, null]]
  )
  assert.is(what, undefined)
})

test('cook non-array population validated', () => {
  const FRUITS = {}
  const what = cook(
    FRUITS,
    'fruits',
    'confiture',
    [[{size: 'XXS'}, ['currants']], [{size: 'XXL'}, null]]
  )
  assert.is(what, undefined)
})

test('cook empty pairs validated', () => {
  const FRUITS = ['currants']
  const what = cook(
    FRUITS,
    'fruits',
    'confiture',
    []
  )
  assert.is(what, undefined)
})

test('cook non-array pairs validated', () => {
  const FRUITS = ['currants']
  const what = cook(
    FRUITS,
    'fruits',
    'confiture',
    {size: 'XXS'}
  )
  assert.is(what, undefined)
})

test('cook duplicate simple features validated', () => {
  const FRUITS = ['currants']
  const what = cook(
    FRUITS,
    'fruits',
    'confiture',
    [[true, ['currants']], [true, null]]
  )
  assert.is(what, undefined)
})

test('cook duplicate simple/object features validated', () => {
  const FRUITS = ['currants']
  const what = cook(
    FRUITS,
    'fruits',
    'confiture',
    [[true, ['currants']], [{}, null], [{}, null]]
  )
  assert.is(what, undefined)
})

test('cook unique but overlapping features validated', () => {
  const FRUITS = ['currants']
  const what = cook(
    FRUITS,
    'fruits',
    'confiture',
    [[{size: 'XXS', me: 'special'}, ['currants']], [{size: 'XXS'}, null]]
  )
  assert.equal(what, [
    {confiture: {size: 'XXS', me: 'special'}, fruits: ['currants']},
    {confiture: {size: 'XXS'}, fruits: []}
  ])
})

test('cook unique but overlapping nested features validated', () => {
  const FRUITS = ['currants']
  const what = cook(
    FRUITS,
    'fruits',
    'confiture',
    [[{size: {here: 'XXS', there: 64}}, ['currants']], [{size: {here: 'XXS', there: 64}}, null]]
  )
  assert.is(what, undefined)
})

test('cook duplicate deep features validated', () => {
  const FRUITS = ['currants']
  const what = cook(
    FRUITS,
    'fruits',
    'confiture',
    [[{size: 'XXS'}, ['currants']], [{size: 'XXS'}, null]]
  )
  assert.is(what, undefined)
})

test('cook over population validated', () => {
  const FRUITS = ['currants']
  const what = cook(
    FRUITS,
    'fruits',
    'confiture',
    [[{size: 'XXS'}, ['currants', 'currants']], [{size: 'XXL'}, null]]
  )
  assert.is(what, undefined)
})

test('cook non-member population validated', () => {
  const FRUITS = ['currants']
  const what = cook(
    FRUITS,
    'fruits',
    'confiture',
    [[{size: 'XXS'}, ['apples']], [{size: 'XXL'}, null]]
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
