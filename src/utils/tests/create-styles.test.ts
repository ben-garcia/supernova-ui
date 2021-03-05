import createStyles from '../create-styles';

describe('createStyles', () => {
  it('should return empty object when passing an empty', () => {
    const expected = {};
    const result = createStyles({});

    expect(result).toStrictEqual(expected);
  });

  it('should return empty object when passing props with acceptable values', () => {
    const props = {
      align: 'left',
      backgroundColor: 'info',
      color: 'primary',
      fontSize: 'md',
      font: 'heading',
      fontWeight: 'xl',
      height: 'xxl',
      letterSpacing: 'xs',
      lineHeight: 'md',
      margin: 'lg',
      padding: 'md',
      textTransform: 'capitalize',
      width: 'xl',
    };

    const result = createStyles(props);

    expect(result).toStrictEqual({});
  });

  it('should return correct object when passing props with custom values', () => {
    const props = {
      backgroundColor: 'green',
      color: 'white',
      fontSize: '6em',
      fontWeight: '700',
      height: '100px',
      letterSpacing: '-0.2rem',
      lineHeight: '3%',
      margin: '2rem',
      padding: '50px',
      textTransform: 'none',
      width: '200px',
    };
    const result = createStyles(props);

    expect(result).toStrictEqual(props);
  });

  it('should convert non css properties into valid properties', () => {
    const props = {
      align: 'justify',
      font: 'Helvetica',
    };
    const result = createStyles(props);

    expect(result).toStrictEqual({
      textAlign: props.align,
      fontFamily: props.font,
    });
  });
});
