import createClasses from '../create-classes';

describe('createClasses', () => {
  const classOne = 'first-class';
  const classTwo = 'second-class';
  const classThree = 'third-class';

  it('should ignore when initalClass is empty', () => {
    const className = '';
    expect(
      createClasses(className, {
        [classOne]: true,
        [classTwo]: false,
      })
    ).toBe(classOne);
  });

  it('should return initialClass when passing empty obj', () => {
    const className = 'test-class';
    expect(createClasses(className, {})).toBe(className);
  });

  it('should return string with the correct classes when obj values are all true', () => {
    const expected = 'first-class second-class third-class';
    const obj = {
      [classTwo]: true,
      [classThree]: true,
    };

    expect(createClasses(classOne, obj)).toBe(expected);
  });

  it('should return string with intialClass when obj values are all false', () => {
    const expected = 'first-class';
    const obj = {
      [classTwo]: false,
      [classThree]: false,
    };

    expect(createClasses(classOne, obj)).toBe(expected);
  });

  it('should return string with correct classes when obj values are mixed', () => {
    const expected = 'first-class third-class';
    const obj = {
      [classTwo]: false,
      [classThree]: true,
    };
    expect(createClasses(classOne, obj)).toBe(expected);
  });
});
