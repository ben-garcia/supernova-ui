/* eslint prefer-destructuring: 0 */
/* eslint no-param-reassign: 0 */

import { CSSProperties } from 'react';

import { isObject, isString } from './assertions';
import { createCssJsProperty, colors, sizes } from './conversions';
import { Theme } from '../theme';
import { Breakpoints, Sizes } from '../types/common';

interface Props {
  [key: string]: any;
}

/**
 * adds css property based on the current breakpoint
 *
 * @param propertyName name of the css property
 * @param responsiveObject contains all the user defined breakpoint values
 * @param styles object to add the styles to
 * @param theme the object that defines everything
 * @param breakpoint current breakpoint
 * @param validSizes array of valid sizes
 */
export const responsify = (
  propertyName: string,
  responsiveObject: any,
  styles: any,
  theme: any,
  breakpoint: keyof Breakpoints,
  validSizes: string[]
) => {
  if (validSizes.includes(responsiveObject[breakpoint])) {
    styles[propertyName] = theme[responsiveObject[breakpoint]];
  } else {
    styles[propertyName] = responsiveObject[breakpoint];
  }
};

/**
 * generates all margin or padding responsive styles
 *
 * @param propertyName the prop name
 * @param property the component prop to evaluate
 * @param styles the styles object to add the styles to
 * @param spacingTheme the spacing property from the theme object
 * @param breakpoint the active breakpoint that matches the current viewport
 * @param sizes the valid sizes defined in the theme
 */
export const createMarginPaddingStyles = (
  propertyName: string,
  property: any,
  styles: any,
  spacingTheme: Theme['spacing'],
  breakpoint: keyof Breakpoints,
  validSizes: string[]
) => {
  // when property is an object
  if (isObject(property)) {
    // loop through the properties of the property object
    Object.entries(property).forEach(([outerProp, outerPropValue]) => {
      // when outerPropValue is a string
      if (isString(outerPropValue)) {
        const cssJsProperty = createCssJsProperty(outerProp, propertyName);

        // check for a valid size
        if (validSizes.includes(outerPropValue as string)) {
          styles[cssJsProperty] = spacingTheme[outerPropValue as Sizes];
        } else if (!validSizes.includes(outerPropValue as string)) {
          // when not a valid size
          styles[cssJsProperty] = outerPropValue;
        }
        // make sure the outerPropValue is a valid size
        // horizontal check
        else if (outerProp === 'x') {
          // direction properties take presedence
          // make sure that direction properties are not defined
          if (
            !styles[`${propertyName}Left`] &&
            !styles[`${propertyName}Right`] &&
            validSizes.includes(outerPropValue as string)
          ) {
            styles[`${propertyName}Left`] = `var(--space-${outerPropValue})`;
            styles[`${propertyName}Right`] = `var(--space-${outerPropValue})`;
            // using theme
            // styles[`${property}Left`] = `${spacingTheme[outerPropValue]}`;
            // styles[`${property}Right`] = `${spacingTheme[outerPropValue]}`;
          } else if (
            !styles[`${propertyName}Left`] &&
            !styles[`${propertyName}Right`] &&
            !validSizes.includes(outerPropValue as string)
          ) {
            styles[`${propertyName}Left`] = outerPropValue;
            styles[`${propertyName}Right`] = outerPropValue;
          }
        }
        // vertical check
        else if (outerProp === 'y') {
          // direction properties take presedence
          // make sure that direction properties are not defined
          if (
            !styles[`${propertyName}Bottom`] &&
            !styles[`${propertyName}Top`] &&
            validSizes.includes(outerPropValue as string)
          ) {
            styles[`${propertyName}Bottom`] = `var(--space-${outerPropValue})`;
            styles[`${propertyName}Top`] = `var(--space-${outerPropValue})`;
            // using theme
            // styles[`${property}Bottom`] = `${theme.spacing[outerPropValue]}`;
            // styles[`${property}Top`] = `${theme.spacing[outerPropValue]}`;
          } else if (
            !styles[`${propertyName}Bottom`] &&
            !styles[`${propertyName}Top`] &&
            !validSizes.includes(outerPropValue as string)
          ) {
            styles[`${propertyName}Bottom`] = outerPropValue;
            styles[`${propertyName}Top`] = outerPropValue;
          }
        }
        // value is a object defining breakpoints
      } else if (isObject(outerPropValue)) {
        Object.entries(outerPropValue as any).forEach(
          ([innerProp, innerPropValue]) => {
            // check that innerProp and innerPropValue are valid breakpoints
            if (validSizes.includes(innerProp)) {
              const cssJsProperty = createCssJsProperty(
                outerProp,
                propertyName
              );
              if (outerProp !== 'x' && outerProp !== 'y') {
                if (validSizes.includes(innerPropValue as string)) {
                  // make sure that the breakpoint is equal to the breakpoint value
                  if (breakpoint === innerProp) {
                    styles[cssJsProperty] = spacingTheme[breakpoint];
                  }
                } else if (!validSizes.includes(innerPropValue as string)) {
                  if (breakpoint === innerProp) {
                    styles[cssJsProperty] = innerPropValue;
                  }
                }
              }
            }
            // horizontal check
            if (outerProp === 'x') {
              // direction properties take presedence
              // make sure that direction properties are not defined
              if (
                !styles[`${propertyName}Left`] &&
                !styles[`${propertyName}Right`] &&
                breakpoint === innerProp
              ) {
                // if v(value) is a valid size
                if (validSizes.includes(innerPropValue as string)) {
                  styles[`${propertyName}Left`] =
                    spacingTheme[innerPropValue as Sizes];
                  styles[`${propertyName}Right`] =
                    spacingTheme[innerPropValue as Sizes];
                } else {
                  styles[`${propertyName}Left`] = innerPropValue;
                  styles[`${propertyName}Right`] = innerPropValue;
                }
              }
            }
            // vertical check
            if (outerProp === 'y') {
              // direction properties take presedence
              // make sure that direction properties are not defined
              if (
                !styles[`${propertyName}Bottom`] &&
                !styles[`${propertyName}Top`] &&
                breakpoint === innerProp
              ) {
                // if v(value) is a valid size
                if (validSizes.includes(innerPropValue as string)) {
                  styles[`${propertyName}Bottom`] =
                    spacingTheme[innerPropValue as Sizes];
                  styles[`${propertyName}Top`] =
                    spacingTheme[innerPropValue as Sizes];
                } else {
                  styles[`${propertyName}Bottom`] = innerPropValue;
                  styles[`${propertyName}Top`] = innerPropValue;
                }
              }
            }
          }
        );
      }
    });
    // margin property value is a string and has mulitple values
  } else if (isString(property)) {
    const directionOptions = property.split(' ');
    const propertyValues = [
      `${propertyName}Top`,
      `${propertyName}Right`,
      `${propertyName}Bottom`,
      `${propertyName}Left`,
    ];
    // make sure values string has between 1 and 4
    if (directionOptions.length > 1 && directionOptions.length <= 4) {
      // user has passed 2 values to margin prop
      if (directionOptions.length === 2) {
        // first value is a valid size
        if (validSizes.includes(directionOptions[0])) {
          styles[propertyValues[0]] =
            spacingTheme[directionOptions[0] as Sizes];
          styles[propertyValues[2]] =
            spacingTheme[directionOptions[0] as Sizes];
        } else if (!validSizes.includes(directionOptions[0])) {
          // when first value is not a valid size
          // set the property on styles object to the first value
          styles[propertyValues[0]] = directionOptions[0];
          styles[propertyValues[2]] = directionOptions[0];
        }
        // second value is a valid size
        if (validSizes.includes(directionOptions[1])) {
          styles[propertyValues[1]] =
            spacingTheme[directionOptions[1] as Sizes];
          styles[propertyValues[3]] =
            spacingTheme[directionOptions[1] as Sizes];
        } else if (!validSizes.includes(directionOptions[1])) {
          // not a valid size
          styles[propertyValues[1]] = directionOptions[1];
          styles[propertyValues[3]] = directionOptions[1];
        }
      }
      // user has passed 3 values to margin prop
      if (directionOptions.length === 3) {
        // first value is a valid size
        if (validSizes.includes(directionOptions[0])) {
          styles[propertyValues[0]] =
            spacingTheme[directionOptions[0] as Sizes];
        } else if (!validSizes.includes(directionOptions[0])) {
          // when first value is not a valid size
          // set the property on styles object to the first value
          styles[propertyValues[0]] = directionOptions[0];
        }
        // second value is a valid size
        if (validSizes.includes(directionOptions[1])) {
          styles[propertyValues[1]] =
            spacingTheme[directionOptions[1] as Sizes];
          styles[propertyValues[3]] =
            spacingTheme[directionOptions[1] as Sizes];
        } else if (!validSizes.includes(directionOptions[1])) {
          // not a valid size
          styles[propertyValues[1]] = directionOptions[1];
          styles[propertyValues[3]] = directionOptions[1];
        }
        // third value is a valid size
        if (validSizes.includes(directionOptions[2])) {
          styles[propertyValues[2]] =
            spacingTheme[directionOptions[2] as Sizes];
        } else if (!validSizes.includes(directionOptions[2])) {
          // not a valid size
          styles[propertyValues[2]] = directionOptions[2];
        }
      }
      // user has passed 4 values to margin prop
      if (directionOptions.length === 4) {
        // first value is a valid size
        if (validSizes.includes(directionOptions[0])) {
          styles[propertyValues[0]] =
            spacingTheme[directionOptions[0] as Sizes];
        } else if (!validSizes.includes(directionOptions[0])) {
          // when first value is not a valid size
          // set the property on styles object to the first value
          styles[propertyValues[0]] = directionOptions[0];
        }
        // second value is a valid size
        if (validSizes.includes(directionOptions[1])) {
          styles[propertyValues[1]] =
            spacingTheme[directionOptions[1] as Sizes];
        } else if (!validSizes.includes(directionOptions[1])) {
          // not a valid size
          styles[propertyValues[1]] = directionOptions[1];
        }
        // third value is a valid size
        if (validSizes.includes(directionOptions[2])) {
          styles[propertyValues[2]] =
            spacingTheme[directionOptions[2] as Sizes];
        } else if (!validSizes.includes(directionOptions[2])) {
          // not a valid size
          styles[propertyValues[2]] = directionOptions[2];
        }
        // third value is a valid size
        if (validSizes.includes(directionOptions[3])) {
          styles[propertyValues[3]] =
            spacingTheme[directionOptions[3] as Sizes];
        } else if (!validSizes.includes(directionOptions[3])) {
          // not a valid size
          styles[propertyValues[3]] = directionOptions[3];
        }
      }
    }
  }
};

/**
 * create the styles object using the props object
 *
 * if the property values don't match any of the defined values
 * then user is trying to add their own value
 *
 * @param props component props
 * @param theme application theme
 * @param breakpoint breakpoint that matches the window
 *
 * @returns styles object with all the created css properties formatted for js
 */
export const createStyles = (props: Props, theme: Theme, breakpoint: Sizes) => {
  if (!Object.keys(props).length) {
    return {};
  }
  const {
    align,
    backgroundColor,
    borderRadius,
    boxShadow,
    color,
    font,
    fontSize,
    fontWeight,
    height,
    letterSpacing,
    lineHeight,
    margin,
    padding,
    size,
    textTransform,
    width,
  } = props;
  const styles: any = {};

  // eslint-disable-next-line
  for (const [property, value] of Object.entries(props)) {
    if (property === 'align') {
      if (
        align &&
        align !== 'center' &&
        align !== 'left' &&
        align !== 'right'
      ) {
        styles.textAlign = value as CSSProperties['textAlign'];
      }
    } else if (property === 'backgroundColor') {
      if (
        backgroundColor !== '' &&
        !colors.includes(backgroundColor as string)
      ) {
        styles.backgroundColor = value as string;
      }
    } else if (property === 'borderRadius') {
      if (isString(borderRadius) && !sizes.includes(borderRadius)) {
        styles.borderRadius = value;
      }
    } else if (property === 'boxShadow') {
      if (isString(boxShadow) && !sizes.includes(boxShadow)) {
        styles.boxShadow = value;
      }
    } else if (property === 'color') {
      if (color && !colors.includes(color as string)) {
        styles.color = value as string;
      }
    } else if (property === 'font') {
      if (font && font !== 'heading' && font !== 'body' && font !== 'mono') {
        styles.fontFamily = value as string;
      }
    } else if (property === 'fontSize') {
      if (isString(fontSize) && !sizes.includes(fontSize)) {
        styles.fontSize = value;
      } else if (isObject(fontSize)) {
        responsify(
          'fontSize',
          fontSize,
          styles,
          theme.typography.fontSizes,
          breakpoint,
          sizes
        );
      }
    } else if (property === 'fontWeight') {
      if (fontWeight && !sizes.includes(fontWeight as string)) {
        styles.fontWeight = value as CSSProperties['fontWeight'];
      }
    } else if (property === 'height') {
      if (isString(height) && !sizes.includes(height)) {
        styles.height = value;
      } else if (isObject(height)) {
        responsify('height', height, styles, theme.spacing, breakpoint, sizes);
      }
    } else if (property === 'letterSpacing') {
      if (letterSpacing && !sizes.includes(letterSpacing as string)) {
        styles.letterSpacing = value as string;
      }
    } else if (property === 'lineHeight') {
      if (lineHeight && !sizes.includes(lineHeight as string)) {
        styles.lineHeight = value as string;
      }
    } else if (property === 'margin') {
      createMarginPaddingStyles(
        'margin',
        margin,
        styles,
        theme.spacing,
        breakpoint,
        sizes
      );
    } else if (property === 'padding') {
      createMarginPaddingStyles(
        'padding',
        padding,
        styles,
        theme.spacing,
        breakpoint,
        sizes
      );
    } else if (property === 'size') {
      if (isString(size) && !sizes.includes(size)) {
        styles.height = value;
        styles.width = value;
      } else if (isObject(size)) {
        responsify('height', size, styles, theme.spacing, breakpoint, sizes);
        responsify('width', size, styles, theme.spacing, breakpoint, sizes);
      }
    } else if (property === 'textTransform') {
      if (
        textTransform &&
        textTransform !== 'capitalize' &&
        textTransform !== 'lowercase' &&
        textTransform !== 'uppercase'
      ) {
        styles.textTransform = value as CSSProperties['textTransform'];
      }
    } else if (property === 'width') {
      if (isString(width) && !sizes.includes(width)) {
        styles.width = value;
      } else if (isObject(width)) {
        responsify('width', width, styles, theme.spacing, breakpoint, sizes);
      }
    }
  }

  return styles as CSSProperties;
};
