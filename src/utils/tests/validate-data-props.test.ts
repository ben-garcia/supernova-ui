import validateDataProps from '../validate-data-props';

describe('validateDataProps', () => {
  it('should filter non "data-*" props', () => {
    const props = {
      age: 10,
      name: 'ben',
      user: { id: 10 },
      'data-testid': 'testid',
      'data-name': 'ben',
      'datat-number': 20,
    };
    const expected = {
      'data-testid': 'testid',
      'data-name': 'ben',
    };

    expect(validateDataProps(props)).toStrictEqual(expected);
  });
});
