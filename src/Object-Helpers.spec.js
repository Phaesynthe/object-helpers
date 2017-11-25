/* global after, before, describe, it, require */
'use strict'

const expect = require('chai').expect;

// Tested Module
const ObjectHelpers = require('./Object-Helpers.module');

describe('Object Helpers', () => {

  it('exists', () => {
    expect(ObjectHelpers).to.be.a('object');
  });

  describe('delta()', () => {

    it('exists', () => {
      expect(ObjectHelpers.delta).to.be.a('function');
    });

    it('indicates when values do not change', () => {
      let obj1 = {
        test: 'value'
      };
      let obj2 = {
        test: 'value'
      };

      const result = ObjectHelpers.delta(obj1, obj2);
      expect(result).to.be.a('object');
      expect(result.test).to.be.a('string');
      expect(result.test).to.equal('un-modified');
    });

    it('indicates when values changes', () => {
      let obj1 = {
        test: 'value'
      };
      let obj2 = {
        test: 'new'
      };

      const result = ObjectHelpers.delta(obj1, obj2);
      expect(result).to.be.a('object');
      expect(result.test).to.be.a('string');
      expect(result.test).to.equal('updated');
    });

    it('indicates when a value is removed', () => {
      let obj1 = {
        test: 'value'
      };
      let obj2 = {
        notEvaluated: 'new'
      };

      const result = ObjectHelpers.delta(obj1, obj2);
      expect(result).to.be.a('object');
      expect(result.test).to.be.a('string');
      expect(result.test).to.equal('deleted');
    });

    it('indicates when a value is removed', () => {
      let obj1 = {
        notEvaluated: 'value'
      };
      let obj2 = {
        test: 'new'
      };

      const result = ObjectHelpers.delta(obj1, obj2);
      expect(result).to.be.a('object');
      expect(result.test).to.be.a('string');
      expect(result.test).to.equal('created');
    });

    it('does not evaluate value changes in objects', () => {
      let obj1 = {
        test: {
          test: 'value'
        }
      };
      let obj2 = {
        test: {
          test: 'new'
        }
      };

      const result = ObjectHelpers.delta(obj1, obj2);
      expect(result).to.be.a('object');
      expect(result.test).to.be.a('string');
      expect(result.test).to.equal('object value evaluation not supported');
    });

  });

  describe('flatten()', () => {

    it('exists', () => {
      expect(ObjectHelpers.flatten).to.be.a('function');
    });

    it('does not modify a single depth object', () => {
      const testObject = {
        test: 'value'
      };
      let output = ObjectHelpers.flatten(testObject);

      expect(output).to.be.a('object');
      expect(output.test).to.equal('value');
    });

    it('maps a nested value into a single depth object', () => {
      const testObject = {
        nested: {
          test: 'value'
        }
      };
      let output = ObjectHelpers.flatten(testObject);

      expect(output).to.be.a('object');
      expect(output.nested_test).to.equal('value');
    });

    it('maps a deeply nested value into a single depth object', () => {
      const testObject = {
        nested: {
          really: {
            really: {
              deep: {
                test: 'value'
              }
            }
          }
        }
      };
      let output = ObjectHelpers.flatten(testObject);

      expect(output).to.be.a('object');
      expect(output.nested_really_really_deep_test).to.equal('value');
    });

  });

  describe('indexAttributes()', () => {

    it('exists', () => {
      expect(ObjectHelpers.indexAttributes).to.be.a('function');
    });

    it('returns an empty array when called with an empty object', () => {
      let obj = {};

      let result = ObjectHelpers.indexAttributes(obj);

      expect(result).to.be.an('array').to.have.lengthOf(0);
      expect(ObjectHelpers.indexAttributes).to.be.a('function');
    });

    it('returns an array with the correct number of keys when called with one object', () => {
      let obj = {
        test: 'value'
      };

      let result = ObjectHelpers.indexAttributes(obj);

      expect(result).to.be.an('array');
      expect(result).to.be.an('array').to.have.lengthOf(1);
    });

    it('returns an array with the correct number of keys when called with several objects containing only duplicate keys', () => {
      let obj1 = {
        test: 'value1'
      };
      let obj2 = {
        test: 'value2'
      };
      let obj3 = {
        test: 'value3'
      };

      let result = ObjectHelpers.indexAttributes(obj1, obj2, obj3);

      expect(result).to.be.an('array');
      expect(result).to.be.an('array').to.have.lengthOf(1);
    });

    it('returns an array with the correct number of keys when called with several objects containing only unique keys', () => {
      let obj1 = {
        test1: 'value1'
      };
      let obj2 = {
        test2: 'value2'
      };
      let obj3 = {
        test3: 'value3'
      };

      let result = ObjectHelpers.indexAttributes(obj1, obj2, obj3);

      expect(result).to.be.an('array');
      expect(result).to.be.an('array').to.have.lengthOf(3);
    });

    it('returns an array with the correct number of keys when called with several objects containing some overlapping keys', () => {
      let obj1 = {
        test1: 'value1'
      };
      let obj2 = {
        test1: 'value1',
        test2: 'value2'
      };
      let obj3 = {
        test2: 'value2',
        test3: 'value3'
      };

      let result = ObjectHelpers.indexAttributes(obj1, obj2, obj3);

      expect(result).to.be.an('array');
      expect(result).to.be.an('array').to.have.lengthOf(3);
    });

  });

  describe('merge()', () => {

    it('existis', () => {
      expect(ObjectHelpers.merge).to.be.a('function');
    })

    it('returns the first object when called with only one object', () => {
      const result = ObjectHelpers.merge({ test: 'value'})
      expect(Object.keys(result).length).to.equal(1)
      expect(result.test).to.equal('value')
    })

    it('merges new string values in', () => {
      const result = ObjectHelpers.merge({ test: 'value'} , { merged: 'string'})
      expect(Object.keys(result).length).to.equal(2)
      expect(result.test).to.equal('value')
      expect(result.merged).to.equal('string')
    })

    it('merges new number values in', () => {
      const result = ObjectHelpers.merge({ test: 'value'} , { merged: 1 })
      expect(Object.keys(result).length).to.equal(2)
      expect(result.test).to.equal('value')
      expect(result.merged).to.equal(1)
    })

    it('merges new number float values in', () => {
      const result = ObjectHelpers.merge({ test: 'value'} , { merged: 1.2 })
      expect(Object.keys(result).length).to.equal(2)
      expect(result.test).to.equal('value')
      expect(result.merged).to.equal(1.2)
    })

    it('merges new date values in', () => {
      const dateValue = new Date()
      const result = ObjectHelpers.merge({ test: 'value'} , { merged: dateValue})
      expect(Object.keys(result).length).to.equal(2)
      expect(result.test).to.equal('value')
      expect(result.merged.toISOString()).to.equal(dateValue.toISOString())
    })

    it('merges new arrays in', () => {
      const result = ObjectHelpers.merge({ test: 'value'} , { merged: ['test']})
      expect(Object.keys(result).length).to.equal(2)
      expect(result.test).to.equal('value')
      expect(result.merged.length).to.equal(1)
      expect(result.merged[0]).to.equal('test')
    })

    it('merges new objects in', () => {
      const result = ObjectHelpers.merge({ test: 'value'} , { merged: { test: 'value2' } })
      expect(Object.keys(result).length).to.equal(2)
      expect(result.test).to.equal('value')
      expect(typeof result.merged).to.equal('object')
      expect(result.merged.test).to.equal('value2')
    })

    it('replaces string values in', () => {
      const result = ObjectHelpers.merge({ test: 'value'} , { test: 'string'})
      expect(Object.keys(result).length).to.equal(1)
      expect(result.test).to.equal('string')
    })

    it('merges number values in', () => {
      const result = ObjectHelpers.merge({ test: 'value'} , { test: 1 })
      expect(Object.keys(result).length).to.equal(1)
      expect(result.test).to.equal(1)
    })

    it('merges number float values in', () => {
      const result = ObjectHelpers.merge({ test: 'value'} , { test: 1.2 })
      expect(Object.keys(result).length).to.equal(1)
      expect(result.test).to.equal(1.2)
    })

    it('merges date values in', () => {
      const dateValue = new Date()
      const result = ObjectHelpers.merge({ test: 'value'} , { test: dateValue})
      expect(Object.keys(result).length).to.equal(1)
      expect(result.test.toISOString()).to.equal(dateValue.toISOString())
    })

    it('merges nested objects in', () => {
      const result = ObjectHelpers.merge({ test: { first: 'value' } } , { test: { second: 'value2' } })
      expect(Object.keys(result).length).to.equal(1)
      expect(result.test).to.be.a('object')
      expect(result.test.first).to.equal('value')
      expect(result.test.second).to.equal('value2')
    })

  })

});
