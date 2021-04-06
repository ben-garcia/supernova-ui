import { isFunction, isObject, isString } from '../assertions';

describe('assertions', () => {
  describe('isFunction', () => {
    it('should be false when supplied an object', () => {
      const result = isFunction({ a: 1 });
      expect(result).toBe(false);
    });

    it('should be false when supplied an array', () => {
      const result = isFunction([1, 2]);
      expect(result).toBe(false);
    });

    it('should be false when supplied a number', () => {
      const result = isFunction(2);
      expect(result).toBe(false);
    });

    it('should be false when supplied a boolean', () => {
      const result = isFunction(false);
      expect(result).toBe(false);
    });

    it('should be true when supplied a function', () => {
      const result = isFunction(() => {});
      expect(result).toBe(true);
    });
  });

  describe('isObject', () => {
    it('should be false when supplied and empty object literal', () => {
      const result = isObject({});
      expect(result).toBe(false);
    });

    it('should be false when supplied an array', () => {
      const result = isObject([1, 2]);
      expect(result).toBe(false);
    });

    it('should be false when supplied a number', () => {
      const result = isObject(2);
      expect(result).toBe(false);
    });

    it('should be false when supplied a boolean', () => {
      const result = isObject(false);
      expect(result).toBe(false);
    });

    it('should be false when supplied a function', () => {
      const result = isObject(() => {});
      expect(result).toBe(false);
    });
  });

  describe('isString', () => {
    it('should be false when supplied an empty string', () => {
      const result = isString('');
      expect(result).toBe(false);
    });

    it('should be false when supplied a string with blank space', () => {
      const result = isString('  ');
      expect(result).toBe(false);
    });

    it('should be false when supplied an emtpy object', () => {
      const result = isString({});
      expect(result).toBe(false);
    });

    it('should be false when supplied a number', () => {
      const result = isString(1);
      expect(result).toBe(false);
    });

    it('should be false when supplied a boolean', () => {
      const result = isString(true);
      expect(result).toBe(false);
    });

    it('should be false when supplied a function', () => {
      const result = isString(() => {});
      expect(result).toBe(false);
    });
  });
});
