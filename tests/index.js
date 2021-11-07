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

test('cook corner case population with additional null member', () => {
  const FRUITS = ['apples', null]
  const bizarre = cook(
    FRUITS,
    'fruits',
    'confiture',
    [[{size: 'XXS'}, ['apples']], [{size: 'XXL'}, null]]
  )
  assert.equal(bizarre, [
    {confiture: {size: 'XXS'}, fruits: ['apples']},
    {confiture: {size: 'XXL'}, fruits: []}
  ])
})

test('cook corner case population with additional undefined member', () => {
  const FRUITS = ['apples', undefined]
  const bizarre = cook(
    FRUITS,
    'fruits',
    'confiture',
    [[{size: 'XXS'}, ['apples']], [{size: 'XXL'}, null]]
  )
  assert.equal(bizarre, [
    {confiture: {size: 'XXS'}, fruits: ['apples']},
    {confiture: {size: 'XXL'}, fruits: [undefined]}
  ])
})

test('cook corner case population with additional undefined and friends members', () => {
  const FRUITS = ['apples', undefined, false, true, [], {}, 42, Symbol()]
  const bizarre = cook(
    FRUITS,
    'fruits',
    'confiture',
    [[{size: 'XXS'}, ['apples']], [{size: 'XXL'}, null]]
  )
  assert.equal(JSON.stringify(bizarre), JSON.stringify([
    {confiture: {size: 'XXS'}, fruits: ['apples']},
    {confiture: {size: 'XXL'}, fruits: [undefined, false, true, [], {}, 42, null]}
  ]))
})

test('cook abuse case population with single null member', () => {
  const FRUITS = [null]
  const cleansed = cook(
    FRUITS,
    'fruits',
    'confiture',
    [[{size: 'XXS'}, null], [{size: 'XXL'}, null]]
  )
  assert.is(cleansed, undefined)
})

test('cook many, many, and many', () => {
  const FRUITS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const masses = cook(
    FRUITS,
    'f',
    'c',
    [[1, [1]], [2, [2]], [3, [3]], [4, [4]], [5, [5]], [6, [6]], [7, [7]], [8, [8]], [9, [9]], [10, [10]], [11, [11]], [{thing: 12}, null]]
  )
  assert.equal(masses, [
    {c: 1, f: [1]},
    {c: 2, f: [2]},
    {c: 3, f: [3]},
    {c: 4, f: [4]},
    {c: 5, f: [5]},
    {c: 6, f: [6]},
    {c: 7, f: [7]},
    {c: 8, f: [8]},
    {c: 9, f: [9]},
    {c: 10, f: [10]},
    {c: 11, f: [11]},
    {c: {thing: 12}, f: [12]}
  ])
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
