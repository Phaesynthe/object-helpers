/* global after, before, describe, it, require */

const expect = require('chai').expect;

// Tested Module
const ObjectHelpers = require('./Object-Helpers.module');

describe('Object Helpers', () => {

  it('exists', () => {
    expect(ObjectHelpers).to.be.a('object');
  });

  describe('indexAttributes', () => {

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

  describe('delta', () => {

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

  describe('flatten', () => {

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

});
