import { createCssJsProperty, objectToPropertiesArray } from '../conversions';

describe('conversions', () => {
  describe('createCssJsProperty', () => {
    it('should be correctly formatted', () => {
      const result = createCssJsProperty('bottom', 'margin');
      expect(result).toBe('marginBottom');
    });

    it('should return empty string when both params are empty', () => {
      const result = createCssJsProperty('', '');
      expect(result).toBe('');
    });

    it('should return empty string when innerProp param is empty', () => {
      const result = createCssJsProperty('', 'padding');
      expect(result).toBe('');
    });

    it('should return empty string when outerProp param is empty', () => {
      const result = createCssJsProperty('top', '');
      expect(result).toBe('');
    });
  });
  describe('objectToPropertiesArray', () => {
    it('should return correctly formatted array', () => {
      const obj = {
        one: 1,
        two: 2,
        test: 'testing',
      };
      const expected = ['one', 'two', 'test'];
      const result = objectToPropertiesArray(obj);

      expect(result).toEqual(expected);
    });

    it('should return emtpy array when supplied an empty object', () => {
      const result = objectToPropertiesArray({});
      expect(result).toEqual([]);
    });
  });
});
