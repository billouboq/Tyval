'use strict'
/* globals check, variable */
/* eslint-disable no-native-reassign, no-extend-native, no-new-func */

const test = require('ava')
const tyval = require('../tyval')

test('array', (t) => {
  t.plan(4)
  t.is(typeof tyval.array, 'function')
  let arr = tyval.array().toFunction()
  t.is(typeof arr, 'function')
  t.true(arr([]))
  t.false(arr('test'))
})

test('maxArray', (t) => {
  t.plan(4)
  t.is(typeof tyval.array.max, 'function')
  let max = tyval.array().max(10).toFunction()
  t.is(typeof max, 'function')
  t.true(max([1, 2, 3]))
  t.false(max([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]))
})

test('minArray', (t) => {
  t.plan(4)
  t.is(typeof tyval.array.min, 'function')
  let min = tyval.array().min(3).toFunction()
  t.is(typeof min, 'function')
  t.true(min([1, 2, 3, 4]))
  t.false(min([]))
})

test('lengthArray', (t) => {
  t.plan(4)
  t.is(typeof tyval.array.length, 'function')
  let len = tyval.array().length(3).toFunction()
  t.is(typeof len, 'function')
  t.true(len([1, 2, 3]))
  t.false(len([1, 2]))
})

test('arrayTest', (t) => {
  t.plan(4)
  let arrayTest = tyval.array().max(10).min(2).toFunction()
  t.is(typeof arrayTest, 'function')
  t.true(arrayTest([1, 2, 3]))
  t.false(arrayTest([1]))
  t.false(arrayTest({}))
})

test('array.extend', (t) => {
  t.plan(4)
  tyval.array.extend(function empty () {
    tyval.array.validators.push(function empty () {
      check = check && variable.length === 0
    })
    return this
  })
  t.is(typeof tyval.array.empty, 'function')
  let empty = tyval.array().empty().toFunction()
  t.is(typeof empty, 'function')
  t.true(empty([]))
  t.false(empty([1]))
})
