import {
  createMarginPaddingStyles,
  createStyles,
  responsify,
} from '../create-styles';

describe('createStyles', () => {
  let styles = {};
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
  const spacingTheme = {
    xs: 4,
    sm: 8,
    md: 20,
    lg: 32,
    xl: 60,
    xxl: 84,
  };

  describe('responsify', () => {
    it('should modify the styles object when values are a valid size', () => {
      const responsiveObject = {
        xs: 'xs',
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
        xxl: 'xxl',
      };
      const breakpoint = 'md';
      responsify(
        'fontSize',
        responsiveObject,
        styles,
        spacingTheme,
        breakpoint,
        sizes
      );
      const expected = {
        fontSize: spacingTheme[breakpoint],
      };

      expect(styles).toEqual(expected);
    });

    it('should modify the styles object when values are not a valid size', () => {
      const responsiveObject = {
        xs: '10px',
        sm: '20px',
        md: '30px',
        lg: '40px',
        xl: '50px',
        xxl: '60px',
      };
      const breakpoint = 'md';
      responsify(
        'fontSize',
        responsiveObject,
        styles,
        spacingTheme,
        breakpoint,
        sizes
      );
      const expected = {
        fontSize: '30px',
      };

      expect(styles).toEqual(expected);
    });
  });

  describe('createMarginPaddingStyles', () => {
    styles = {};
    const properties = {
      bottom: {
        xs: '3px',
        sm: 'sm',
        md: '2rem',
        lg: '5em',
        xl: '10%',
        xxl: 'xxl',
      },
      left: {
        xs: '3px',
        sm: 'sm',
        md: '2rem',
        lg: '5em',
        xl: '10%',
        xxl: 'xxl',
      },
      right: {
        xs: '3px',
        sm: 'sm',
        md: '2rem',
        lg: '5em',
        xl: '10%',
        xxl: 'xxl',
      },
      top: {
        xs: '3px',
        sm: 'sm',
        md: '2rem',
        lg: '5em',
        xl: '10%',
        xxl: 'xxl',
      },
      x: { xs: '3px', sm: 'sm', md: '2rem', lg: '5em', xl: '10%', xxl: 'xxl' },
      y: { xs: '3px', sm: 'sm', md: '2rem', lg: '5em', xl: '10%', xxl: 'xxl' },
    };

    beforeEach(() => {
      styles = {};
    });

    describe('direction prop take precedence', () => {
      it('should ignore x value when left is defined', () => {
        const breakpoint = 'md';
        const expected = {
          marginLeft: '2rem',
        };

        createMarginPaddingStyles(
          'margin',
          { left: properties.left, x: properties.x },
          styles,
          spacingTheme,
          breakpoint,
          sizes
        );

        expect(styles).toEqual(expected);
      });

      it('should ignore x value when right is defined', () => {
        const breakpoint = 'md';
        const expected = {
          marginRight: '2rem',
        };
        createMarginPaddingStyles(
          'margin',
          { right: properties.left, x: properties.x },
          styles,
          spacingTheme,
          breakpoint,
          sizes
        );

        expect(styles).toEqual(expected);
      });

      it('should ignore y value when bottom is defined', () => {
        const breakpoint = 'md';
        const expected = {
          marginBottom: '2rem',
        };

        createMarginPaddingStyles(
          'margin',
          { bottom: properties.bottom, y: properties.y },
          styles,
          spacingTheme,
          breakpoint,
          sizes
        );

        expect(styles).toEqual(expected);
      });

      it('should ignore y value when top is defined', () => {
        const breakpoint = 'md';
        const expected = {
          marginTop: '2rem',
        };

        createMarginPaddingStyles(
          'margin',
          { top: properties.top, y: properties.y },
          styles,
          spacingTheme,
          breakpoint,
          sizes
        );

        expect(styles).toEqual(expected);
      });
    });

    describe('responsiveness', () => {
      describe('bottom', () => {
        it('should only add bottom style when passing margin.bottom for xs breakpoint', () => {
          const breakpoint = 'xs';
          const expected = {
            marginBottom: '3px',
          };

          createMarginPaddingStyles(
            'margin',
            { bottom: properties.bottom },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add bottom style when passing margin.bottom for sm breakpoint', () => {
          const breakpoint = 'sm';
          const expected = {
            marginBottom: 8,
          };

          createMarginPaddingStyles(
            'margin',
            { bottom: properties.bottom },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add bottom style when passing margin.bottom for md breakpoint', () => {
          const breakpoint = 'md';
          const expected = {
            marginBottom: '2rem',
          };

          createMarginPaddingStyles(
            'margin',
            { bottom: properties.bottom },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add bottom style when passing margin.bottom for lg breakpoint', () => {
          const breakpoint = 'lg';
          const expected = {
            marginBottom: '5em',
          };

          createMarginPaddingStyles(
            'margin',
            { bottom: properties.bottom },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add bottom style when passing margin.bottom for xl breakpoint', () => {
          const breakpoint = 'xl';
          const expected = {
            marginBottom: '10%',
          };

          createMarginPaddingStyles(
            'margin',
            { bottom: properties.bottom },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add bottom style when passing margin.bottom for xxl breakpoint', () => {
          const breakpoint = 'xxl';
          const expected = {
            marginBottom: 84,
          };

          createMarginPaddingStyles(
            'margin',
            { bottom: properties.bottom },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });
      });

      describe('left', () => {
        it('should only add left style when passing margin.left for xs breakpoint', () => {
          const breakpoint = 'xs';
          const expected = {
            marginLeft: '3px',
          };

          createMarginPaddingStyles(
            'margin',
            { left: properties.left },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add left style when passing margin.left for sm breakpoint', () => {
          const breakpoint = 'sm';
          const expected = {
            marginLeft: 8,
          };

          createMarginPaddingStyles(
            'margin',
            { left: properties.left },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add left style when passing margin.left for md breakpoint', () => {
          const breakpoint = 'md';
          const expected = {
            marginLeft: '2rem',
          };

          createMarginPaddingStyles(
            'margin',
            { left: properties.left },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add left style when passing margin.left for lg breakpoint', () => {
          const breakpoint = 'lg';
          const expected = {
            marginLeft: '5em',
          };

          createMarginPaddingStyles(
            'margin',
            { left: properties.left },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add left style when passing margin.left for xl breakpoint', () => {
          const breakpoint = 'xl';
          const expected = {
            marginLeft: '10%',
          };

          createMarginPaddingStyles(
            'margin',
            { left: properties.left },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add left style when passing margin.left for xxl breakpoint', () => {
          const breakpoint = 'xxl';
          const expected = {
            marginLeft: 84,
          };

          createMarginPaddingStyles(
            'margin',
            { left: properties.left },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });
      });

      describe('right', () => {
        it('should only add right style when passing margin.right for xs breakpoint', () => {
          const breakpoint = 'xs';
          const expected = {
            marginRight: '3px',
          };

          createMarginPaddingStyles(
            'margin',
            { right: properties.right },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add right style when passing margin.right for sm breakpoint', () => {
          const breakpoint = 'sm';
          const expected = {
            marginRight: 8,
          };

          createMarginPaddingStyles(
            'margin',
            { right: properties.right },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add right style when passing margin.right for md breakpoint', () => {
          const breakpoint = 'md';
          const expected = {
            marginRight: '2rem',
          };

          createMarginPaddingStyles(
            'margin',
            { right: properties.right },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add right style when passing margin.right for lg breakpoint', () => {
          const breakpoint = 'lg';
          const expected = {
            marginRight: '5em',
          };

          createMarginPaddingStyles(
            'margin',
            { right: properties.right },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add right style when passing margin.right for xl breakpoint', () => {
          const breakpoint = 'xl';
          const expected = {
            marginRight: '10%',
          };

          createMarginPaddingStyles(
            'margin',
            { right: properties.right },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add right style when passing margin.right for xxl breakpoint', () => {
          const breakpoint = 'xxl';
          const expected = {
            marginRight: 84,
          };

          createMarginPaddingStyles(
            'margin',
            { right: properties.right },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });
      });

      describe('top', () => {
        it('should only add top style when passing margin.top for xs breakpoint', () => {
          const breakpoint = 'xs';
          const expected = {
            marginTop: '3px',
          };

          createMarginPaddingStyles(
            'margin',
            { top: properties.top },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add top style when passing margin.top for sm breakpoint', () => {
          const breakpoint = 'sm';
          const expected = {
            marginTop: 8,
          };

          createMarginPaddingStyles(
            'margin',
            { top: properties.top },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add top style when passing margin.top for md breakpoint', () => {
          const breakpoint = 'md';
          const expected = {
            marginTop: '2rem',
          };

          createMarginPaddingStyles(
            'margin',
            { top: properties.top },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add top style when passing margin.top for lg breakpoint', () => {
          const breakpoint = 'lg';
          const expected = {
            marginTop: '5em',
          };

          createMarginPaddingStyles(
            'margin',
            { top: properties.top },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add top style when passing margin.top for xl breakpoint', () => {
          const breakpoint = 'xl';
          const expected = {
            marginTop: '10%',
          };

          createMarginPaddingStyles(
            'margin',
            { top: properties.top },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add top style when passing margin.top for xxl breakpoint', () => {
          const breakpoint = 'xxl';
          const expected = {
            marginTop: 84,
          };

          createMarginPaddingStyles(
            'margin',
            { top: properties.top },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });
      });

      describe('x', () => {
        it('should only add left and right styles when passing margin.x for xs breakpoint', () => {
          const breakpoint = 'xs';
          const expected = {
            marginLeft: '3px',
            marginRight: '3px',
          };

          createMarginPaddingStyles(
            'margin',
            { x: properties.x },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add left and right styles when passing margin.x for sm breakpoint', () => {
          const breakpoint = 'sm';
          const expected = {
            marginLeft: 8,
            marginRight: 8,
          };

          createMarginPaddingStyles(
            'margin',
            { x: properties.x },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add left and right styles when passing margin.x for md breakpoint', () => {
          const breakpoint = 'md';
          const expected = {
            marginLeft: '2rem',
            marginRight: '2rem',
          };

          createMarginPaddingStyles(
            'margin',
            { x: properties.x },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add left and right styles when passing margin.x for lg breakpoint', () => {
          const breakpoint = 'lg';
          const expected = {
            marginLeft: '5em',
            marginRight: '5em',
          };

          createMarginPaddingStyles(
            'margin',
            { x: properties.x },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add left and right styles when passing margin.x for xl breakpoint', () => {
          const breakpoint = 'xl';
          const expected = {
            marginLeft: '10%',
            marginRight: '10%',
          };

          createMarginPaddingStyles(
            'margin',
            { x: properties.x },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add left and right styles when passing margin.x for xxl breakpoint', () => {
          const breakpoint = 'xxl';
          const expected = {
            marginLeft: 84,
            marginRight: 84,
          };

          createMarginPaddingStyles(
            'margin',
            { x: properties.x },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });
      });

      describe('y', () => {
        it('should only add bottom and top styles when passing margin.y for xs breakpoint', () => {
          const breakpoint = 'xs';
          const expected = {
            marginBottom: '3px',
            marginTop: '3px',
          };

          createMarginPaddingStyles(
            'margin',
            { y: properties.y },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add bottom and top styles when passing margin.y for sm breakpoint', () => {
          const breakpoint = 'sm';
          const expected = {
            marginBottom: 8,
            marginTop: 8,
          };

          createMarginPaddingStyles(
            'margin',
            { y: properties.y },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add bottom and top styles when passing margin.y for md breakpoint', () => {
          const breakpoint = 'md';
          const expected = {
            marginBottom: '2rem',
            marginTop: '2rem',
          };

          createMarginPaddingStyles(
            'margin',
            { y: properties.y },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add bottom and top styles when passing margin.y for lg breakpoint', () => {
          const breakpoint = 'lg';
          const expected = {
            marginBottom: '5em',
            marginTop: '5em',
          };

          createMarginPaddingStyles(
            'margin',
            { y: properties.y },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add bottom and top styles when passing margin.y for xl breakpoint', () => {
          const breakpoint = 'xl';
          const expected = {
            marginBottom: '10%',
            marginTop: '10%',
          };

          createMarginPaddingStyles(
            'margin',
            { y: properties.y },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });

        it('should only add bottom and top styles when passing margin.y for xxl breakpoint', () => {
          const breakpoint = 'xxl';
          const expected = {
            marginBottom: 84,
            marginTop: 84,
          };

          createMarginPaddingStyles(
            'margin',
            { y: properties.y },
            styles,
            spacingTheme,
            breakpoint,
            sizes
          );

          expect(styles).toEqual(expected);
        });
      });
    });
  });

  describe('createStyles', () => {
    it('should return empty object when passing props with no keys', () => {
      const result = createStyles({}, {} as any, 'md');
      expect(result).toEqual({});
    });
  });
});
