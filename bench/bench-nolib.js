'use strict'

const Benchmark = require('benchmark')
const suite = Benchmark.Suite()

// Emulates the number test
// const numTest = tyval.number().min(-5).max(10).integer().finite().safeInteger().toFunction()
const numTest = function (number) {
  let bool = true
  bool = bool && typeof number === 'number'
  bool = bool && number >= -5
  bool = bool && number <= 10
  bool = bool && Number.isInteger(number)
  bool = bool && Number.isFinite(number)
  bool = bool && Number.isSafeInteger(number)
  return bool
}

// Emulates the string test
// const strTest = tyval.string().min(5).max(10).alphanum().toFunction()
const strTest = function (string) {
  let bool = true
  bool = bool && typeof string === 'string'
  bool = bool && string.length >= 5
  bool = bool && string.length <= 10
  let reg = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i
  bool = bool && reg.test(string)
  return bool
}

// Emulates the array test
// const arrayTest = tyval.array().max(10).min(2).toFunction()
const arrayTest = function (array) {
  let bool = true
  bool = bool && Array.isArray(array)
  bool = bool && array.length <= 10
  bool = bool && array.length >= 2
  return bool
}

// Emulates the object test
// const objTest = tyval.object().notNull().notArray().notDate().notRegExp().toFunction()
const objTest = function (obj) {
  let bool = true
  bool = bool && typeof obj === 'object'
  bool = bool && obj !== null
  bool = bool && !Array.isArray(obj)
  bool = bool && !(obj instanceof Date)
  bool = bool && !(obj instanceof RegExp)
  return bool
}

const objHas = function (obj) {
  let bool = true
  bool = bool && typeof obj === 'object'
  bool = bool && obj.hasOwnProperty('test')
  bool = bool && obj.hasOwnProperty('bench')
  bool = bool && !obj.hasOwnProperty('nope')
  return bool
}

let objToTest = {
  test: 'test42',
  bench: 5
}

suite
  .add('numTest', function () {
    numTest(5)
  })
  .add('numTest-false', function () {
    numTest(-50)
  })
  .add('strTest', function () {
    strTest('abc123')
  })
  .add('strTest-false', function () {
    strTest('abcdef')
  })
  .add('arrayTest', function () {
    arrayTest([1, 2, 3])
  })
  .add('arrayTest-false', function () {
    arrayTest([1])
  })
  .add('objTest', function () {
    objTest({})
  })
  .add('objTest-false', function () {
    objTest([])
  })
  .add('objHas', function () {
    objHas({test: 1, bench: 2})
  })
  .add('objHas-false', function () {
    objHas({test: 1, bench: 2, nope: 3})
  })
  .add('combined obj and str', function () {
    objHas(objToTest) && strTest(objToTest.test) && numTest(objToTest.bench)
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {})
  .run()
