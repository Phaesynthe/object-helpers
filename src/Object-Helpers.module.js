/* global module */
'use strict'



const ObjectHelpers = {

  /**
   * Accepts two objects and returns an object describing the changes between the two object. This does not include the values, only a representation of what the change action was. This function does not flatten input objects and only evaluated root attributes. Any child objects are ignored.
   * @param {object} oldObject Assumed to be a previous version of the object.
   * @param {object} newObject Assumed to be a more recent version of the object.
   * @returns {object} An object of key-value pairs where the key represents a single-depth attribute from one or both of the input objects and the value is a string verb indicating what the difference is.
   */
  delta: (oldObject, newObject) => {
    let delta = {}
    const keys = ObjectHelpers.indexAttributes(oldObject, newObject)

    keys.forEach((key) => {
      if (!oldObject[key]) {
        // If the key does not exist in the first object, the value was created
        delta[key] = 'created'
      } else if (!newObject[key]) {
        // If the key does not exist in the second object, the value was deleted
        delta[key] = 'deleted'
      } else if (typeof oldObject[key] === 'object' || typeof newObject[key] === 'object') {
        delta[key] = 'object value evaluation not supported'
      } else if (oldObject[key] === newObject[key]) {
        // If the key exists in both and the vales are the same, then it was not modified
        delta[key] = 'un-modified'
      } else {
        // If the key exists in both and the vales are not the same, then it was updated
        delta[key] = 'updated'
      }
    })
    return delta
  },

  /**
   * Maps an input object to a single attribute depth output object.
   * @param {Object} obj
   * @param {string} name
   * @param {string} stem
   * @returns {Object} An object with single depth attributes named based on the input Object's attribute value nesting.
   */
  flatten: (obj, name, stem) => {
    let out = {}
    let newStem = (typeof stem !== 'undefined' && stem !== '') ? stem + '_' + name : name

    if (typeof obj !== 'object') {
      out[newStem] = obj
      return out
    }

    for (let attribute in obj) {
      let prop = ObjectHelpers.flatten(obj[attribute], attribute, newStem)
      out =  Object.assign({}, out, prop) // ObjectHelpers.merge([out, prop])
    }
    return out
  },

  /**
   * Creates an array of unique keys from n Object's keys.
   * @param {...object} objectArray A variable number of objects.
   * @returns {Array} Unique keys expressed in any input object.
   */
  indexAttributes: (...objectArray) => {
    let keySet = new Set()

    objectArray.forEach((obj) => {
      Object.keys(obj).forEach((key) => {
        keySet.add(key)
      })
    })

    return Array.from(keySet)
  },

  merge: (objA, objB) => {
    const outObject = Object.assign({}, objA)

    for (const key in objB) {
      if (!outObject[key]) {
        outObject[key] = objB[key]
      } else if (
        typeof objB[key] === 'string' ||
        typeof objB[key] === 'number' ||
        objB[key] instanceof Date ||
        objB[key].length
      ) {
        outObject[key] = objB[key]
      } else if (typeof objB[key] === 'object') {
        outObject[key] = ObjectHelpers.merge(objA[key], objB[key])
      }
    }

    return outObject
  }
}

module.exports = ObjectHelpers
