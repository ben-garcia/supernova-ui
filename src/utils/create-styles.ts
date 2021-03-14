/* eslint prefer-destructuring: 0 */
/* eslint no-param-reassign: 0 */

import { CSSProperties } from 'react';

import { Theme } from '../theme';
import { Breakpoints, Sizes } from '../types/common';
import sizesObject from '../theme/sizes';

interface Props {
  [key: string]: any;
}

/**
 * construct camelcase css property
 *
 * @param innerProp the inner prop of the object
 * @param outerProp the outer prop of the object
 *
 * @return cssJsProperty the camelcase css property
 */
const createCssJsProperty = (innerProp: string, outerProp: string) => {
  const valueUppercase = `${innerProp.replace(
    innerProp[0],
    innerProp[0].toUpperCase()
  )}`;
  const cssJsProperty = `${outerProp}${valueUppercase}`;

  return cssJsProperty;
};

/**
 * check whether a value is of type object
 *
 * @param value the variable to check against
 *
 * @return result whether value is of type object
 *
 */
const isObject = (value: any): boolean =>
  Object.prototype.toString.call(value) === '[object Object]';

/**
 * check whether a value is of type string
 
 * @param value the variable to check against
 *
 * @returns result whether value is of type string
 *
 */
const isString = (value: any): boolean =>
  Object.prototype.toString.call(value) === '[object String]';

/**
 * creates an array out of the properties of the passed object
 *
 * @param object object to get the keys to use
 *
 * @returns array which contains all properties of object as strings
 */
const objectToPropertiesArray = (object: { [k: string]: any }): string[] =>
  Object.keys(object).map(k => `${k}`);

/**
 * generates all margin or padding responsive styles
 *
 * @param propertyName the prop name
 * @param property the component prop to evaluate
 * @param styles the styles object to add the styles to
 * @param spacingTheme the spacing property from the theme object
 * @param breakpoint the active breakpoint that matches the current viewport
 */
const createMarginPaddingStyles = (
  propertyName: string,
  property: any,
  styles: any,
  spacingTheme: Theme['spacing'],
  breakpoint: keyof Breakpoints,
  sizes: string[]
) => {
  // when property is an object
  if (isObject(property)) {
    const directionOptions = ['bottom', 'left', 'right', 'top'];
    // loop through the properties of the property object
    Object.entries(property).forEach(([prop, value2]) => {
      // when value2 is a string
      if (isString(value2)) {
        const cssJsProperty = createCssJsProperty(prop, propertyName);

        // check for valid directions
        if (directionOptions.includes(prop)) {
          styles[cssJsProperty] = value2;
        }
        // make sure the value2 is a valid size
        // horizontal check
        if (prop === 'x') {
          // direction properties take presedence
          // make sure that direction properties are not defined
          if (
            !styles[`${propertyName}Left`] &&
            !styles[`${propertyName}Right`] &&
            sizes.includes(value2 as string)
          ) {
            styles[`${propertyName}Left`] = `var(--space-${value2})`;
            styles[`${propertyName}Right`] = `var(--space-${value2})`;
            // using theme
            // styles[`${property}Left`] = `${theme.spacing[value2]}`;
            // styles[`${property}Right`] = `${theme.spacing[value2]}`;
          } else if (
            !styles[`${propertyName}Left`] &&
            !styles[`${propertyName}Right`] &&
            !sizes.includes(value2 as string)
          ) {
            styles[`${propertyName}Left`] = value2;
            styles[`${propertyName}Right`] = value2;
          }
        }
        // vertical check
        if (prop === 'y') {
          // direction properties take presedence
          // make sure that direction properties are not defined
          if (
            !styles[`${propertyName}Bottom`] &&
            !styles[`${propertyName}Top`] &&
            sizes.includes(value2 as string)
          ) {
            styles[`${propertyName}Bottom`] = `var(--space-${value2})`;
            styles[`${propertyName}Top`] = `var(--space-${value2})`;
            // using theme
            // styles[`${property}Bottom`] = `${theme.spacing[value2]}`;
            // styles[`${property}Top`] = `${theme.spacing[value2]}`;
          } else if (
            !styles[`${propertyName}Bottom`] &&
            !styles[`${propertyName}Top`] &&
            !sizes.includes(value2 as string)
          ) {
            styles[`${propertyName}Bottom`] = value2;
            styles[`${propertyName}Top`] = value2;
          }
        }
        // value is a object defining breakpoints
      } else if (isObject(value2)) {
        Object.entries(value2 as any).forEach(([p, v]) => {
          // check that p and v are valid breakpoints
          if (sizes.includes(p)) {
            const cssJsProperty = createCssJsProperty(prop, propertyName);
            if (sizes.includes(v as string)) {
              // make sure that the breakpoint is equal to the breakpoint value(p)
              if (breakpoint === p) {
                styles[cssJsProperty] = spacingTheme[breakpoint];
              }
            } else if (!sizes.includes(v as string)) {
              if (breakpoint === p) {
                styles[cssJsProperty] = v;
              }
            }
          }
          // horizontal check
          if (prop === 'x') {
            // direction properties take presedence
            // make sure that direction properties are not defined
            if (
              !styles[`${propertyName}Left`] &&
              !styles[`${propertyName}Right`] &&
              breakpoint === p
            ) {
              // if v(value) is a valid size
              if (sizes.includes(v as string)) {
                styles[`${propertyName}Left`] = `var(--space-${v})`;
                styles[`${propertyName}Right`] = `var(--space-${v})`;
                // using theme
                // styles[`${propertyName}Left`] = `${theme.spacing[v]}`;
                // styles[`${propertyName}Right`] = `${theme.spacing[v]}`;
              } else {
                styles[`${propertyName}Left`] = `${v}`;
                styles[`${propertyName}Right`] = `${v}`;
              }
            }
          }
          // vertical check
          if (prop === 'y') {
            // direction properties take presedence
            // make sure that direction properties are not defined
            if (
              !styles[`${propertyName}Bottom`] &&
              !styles[`${propertyName}Top`] &&
              breakpoint === p
            ) {
              // if v(value) is a valid size
              if (sizes.includes(v as string)) {
                styles[`${propertyName}Bottom`] = `var(--space-${v})`;
                styles[`${propertyName}Top`] = `var(--space-${v})`;
                // using theme
                // styles[`${property}Bottom`] = `${theme.spacing[v]}`;
                // styles[`${property}Top`] = `${theme.spacing[v]}`;
              } else {
                styles[`${propertyName}Bottom`] = `${v}`;
                styles[`${propertyName}Top`] = `${v}`;
              }
            }
          }
        });
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
        if (sizes.includes(directionOptions[0])) {
          styles[propertyValues[0]] =
            spacingTheme[directionOptions[0] as Sizes];
          styles[propertyValues[2]] =
            spacingTheme[directionOptions[0] as Sizes];
        } else if (!sizes.includes(directionOptions[0])) {
          // when first value is not a valid size
          // set the property on styles object to the first value
          styles[propertyValues[0]] = directionOptions[0];
          styles[propertyValues[2]] = directionOptions[0];
        }
        // second value is a valid size
        if (sizes.includes(directionOptions[1])) {
          styles[propertyValues[1]] =
            spacingTheme[directionOptions[1] as Sizes];
          styles[propertyValues[3]] =
            spacingTheme[directionOptions[1] as Sizes];
        } else if (!sizes.includes(directionOptions[1])) {
          // not a valid size
          styles[propertyValues[1]] = directionOptions[1];
          styles[propertyValues[3]] = directionOptions[1];
        }
      }
      // user has passed 3 values to margin prop
      if (directionOptions.length === 3) {
        // first value is a valid size
        if (sizes.includes(directionOptions[0])) {
          styles[propertyValues[0]] =
            spacingTheme[directionOptions[0] as Sizes];
        } else if (!sizes.includes(directionOptions[0])) {
          // when first value is not a valid size
          // set the property on styles object to the first value
          styles[propertyValues[0]] = directionOptions[0];
        }
        // second value is a valid size
        if (sizes.includes(directionOptions[1])) {
          styles[propertyValues[1]] =
            spacingTheme[directionOptions[1] as Sizes];
          styles[propertyValues[3]] =
            spacingTheme[directionOptions[1] as Sizes];
        } else if (!sizes.includes(directionOptions[1])) {
          // not a valid size
          styles[propertyValues[1]] = directionOptions[1];
          styles[propertyValues[3]] = directionOptions[1];
        }
        // third value is a valid size
        if (sizes.includes(directionOptions[2])) {
          styles[propertyValues[2]] =
            spacingTheme[directionOptions[2] as Sizes];
        } else if (!sizes.includes(directionOptions[2])) {
          // not a valid size
          styles[propertyValues[2]] = directionOptions[2];
        }
      }
      // user has passed 4 values to margin prop
      if (directionOptions.length === 4) {
        // first value is a valid size
        if (sizes.includes(directionOptions[0])) {
          styles[propertyValues[0]] =
            spacingTheme[directionOptions[0] as Sizes];
        } else if (!sizes.includes(directionOptions[0])) {
          // when first value is not a valid size
          // set the property on styles object to the first value
          styles[propertyValues[0]] = directionOptions[0];
        }
        // second value is a valid size
        if (sizes.includes(directionOptions[1])) {
          styles[propertyValues[1]] =
            spacingTheme[directionOptions[1] as Sizes];
        } else if (!sizes.includes(directionOptions[1])) {
          // not a valid size
          styles[propertyValues[1]] = directionOptions[1];
        }
        // third value is a valid size
        if (sizes.includes(directionOptions[2])) {
          styles[propertyValues[2]] =
            spacingTheme[directionOptions[2] as Sizes];
        } else if (!sizes.includes(directionOptions[2])) {
          // not a valid size
          styles[propertyValues[2]] = directionOptions[2];
        }
        // third value is a valid size
        if (sizes.includes(directionOptions[3])) {
          styles[propertyValues[3]] =
            spacingTheme[directionOptions[3] as Sizes];
        } else if (!sizes.includes(directionOptions[3])) {
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
const createStyles = (props: Props, theme: Theme, breakpoint: Sizes) => {
  if (!Object.keys(props).length) {
    return {};
  }
  const {
    align,
    backgroundColor,
    color,
    font,
    fontSize,
    fontWeight,
    height,
    letterSpacing,
    lineHeight,
    margin,
    padding,
    textTransform,
    width,
  } = props;
  const colors = ['error', 'info', 'primary', 'success', 'warning'];
  const sizes = objectToPropertiesArray(sizesObject);
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
    } else if (property === 'color') {
      if (color && !colors.includes(color as string)) {
        styles.color = value as string;
      }
    } else if (property === 'font') {
      if (font && font !== 'heading' && font !== 'body' && font !== 'mono') {
        styles.fontFamily = value as string;
      }
    } else if (property === 'fontSize') {
      if (fontSize && !sizes.includes(fontSize as string)) {
        styles.fontSize = value as string;
      }
    } else if (property === 'fontWeight') {
      if (fontWeight && !sizes.includes(fontWeight as string)) {
        styles.fontWeight = value as CSSProperties['fontWeight'];
      }
    } else if (property === 'height') {
      if (height && !sizes.includes(height as string)) {
        styles.height = value as string;
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
      if (padding && !sizes.includes(padding as string)) {
        styles.padding = value as string;
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
      if (width && !sizes.includes(width as string)) {
        styles.width = value as string;
      }
    }
  }

  return styles as CSSProperties;
};

export default createStyles;
