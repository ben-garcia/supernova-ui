import deepMergify from '../deep-mergify';

describe('deepMergify', () => {
  it('should return empty object when both object are empty', () => {
    const result = deepMergify({}, {});
    const expected = {};

    expect(result).toEqual(expected);
  });

  it('should return baseObject when extended object is empty', () => {
    const expected = { a: 1 };
    const result = deepMergify(expected, {});

    expect(result).toEqual(expected);
  });

  it('should return extended object when baseObject is empty', () => {
    const expected = { a: 1 };
    const result = deepMergify({}, expected);

    expect(result).toEqual(expected);
  });

  it('should return object that override baseObjects properties', () => {
    const baseObject = { a: 1, b: 2, c: 3 };
    const extendedObject = { a: 2, c: 4 };
    const expected = { a: 2, b: 2, c: 4 };
    const result = deepMergify(baseObject, extendedObject);

    expect(result).toEqual(expected);
  });

  it('should return object with new properties added by extendedObject', () => {
    const baseObject = { a: 1, b: 2, c: { d: 3 } };
    const extendedObject = { c: { d: 5 } };
    const expected = { ...baseObject, c: { d: 5 } };
    const result = deepMergify(baseObject, extendedObject);

    expect(result).toEqual(expected);
  });

  it('should return object with added custom properties and primitive value', () => {
    const baseObject = { a: 1, b: 2, c: { d: 3 } };
    const extendedObject = { c: { customProperty: 'customValue' } };
    const expected = {
      ...baseObject,
      c: { d: 3, customProperty: 'customValue' },
    };
    const result = deepMergify(baseObject, extendedObject);

    expect(result).toEqual(expected);
  });

  it('should return object without added custom properties when its parent property isnt found in baseObject', () => {
    const baseObject = { a: 1, b: 2, c: { d: 3 } };
    const extendedObject = {
      c: { customProperty: 'customValue', another: 'another' },
      ff: 100,
      gg: { hh: 'string' },
    };
    const expected = {
      ...baseObject,
      c: { d: 3, customProperty: 'customValue', another: 'another' },
    };
    const result = deepMergify(baseObject, extendedObject);

    expect(result).toEqual(expected);
  });
});
