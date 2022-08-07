import { validateDataAndAriaProps } from '../validate-data-props';

describe('validateDataAndAriaProps', () => {
  it('should filter for data-*, aria-* and on<listener>* props', () => {
    const props = {
      'aria-label': 'best label',
      'aria-describedby': 'testid',
      age: 10,
      name: 'ben',
      user: { id: 10 },
      'data-testid': 'testid',
      'data-name': 'ben',
      'datat-number': 20,
    };

    const expected = {
      'aria-label': 'best label',
      'aria-describedby': 'testid',
      'data-testid': 'testid',
      'data-name': 'ben',
    };

    expect(validateDataAndAriaProps(props)).toEqual(expected);
  });
});
