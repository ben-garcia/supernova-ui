import { compile, middleware, prefixer, serialize, stringify } from 'stylis';

import { CSSProps, CSSPropsHyphen } from '@types';

import colorsObject from '../theme/colors';
import radiiObject from '../theme/radii';
import shadowsObject from '../theme/shadows';
import sizesObject from '../theme/sizes';

interface AnyObject {
  [k: string]: any;
}

/**
 * creates an array out of the properties of the passed object
 *
 * @param object object to get the keys to use
 *
 * @returns array which contains all properties of object as strings
 */
export const objectToPropertiesArray = (object: AnyObject): string[] =>
  Object.keys(object).map(k => `${k}`);

/**
 * construct camelcase css property
 *
 * @param innerProp the inner prop of the object
 * @param outerProp the outer prop of the object
 *
 * @return cssJsProperty the camelcase css property
 */
export const createCssJsProperty = (innerProp: string, outerProp: string) => {
  if (innerProp?.trim() === '' || outerProp?.trim() === '') {
    return '';
  }
  const valueUppercase = `${innerProp.replace(
    innerProp[0],
    innerProp[0].toUpperCase()
  )}`;
  const cssJsProperty = `${outerProp}${valueUppercase}`;

  return cssJsProperty;
};

/**
 * The available colors provided by the theme
 */
export const colors = objectToPropertiesArray(colorsObject);

/**
 * The available radii provided by the theme
 */
export const radii = objectToPropertiesArray(radiiObject);

/**
 * The available shadows provided by the theme
 */
export const shadows = objectToPropertiesArray(shadowsObject);

/**
 * The available sizes provided by the theme
 *
 * from smallest(xs) to largest(xxl)
 */
export const sizes = objectToPropertiesArray(sizesObject).reverse();

/**
 * Convert JS CSS properties object into an object with valid CSS.
 *
 * Example
 *     input => {backgroundColor: 'red', color: 'white'}
 *     output => {'background-color': 'red', color: 'white'}
 *
 * @param obj Javascript CSS object
 *
 * @returns CSS valid object.
 */
export const cssCamelCaseToHyphenated = (props: CSSProps) => {
  const newObj: CSSPropsHyphen = {};
  // keep track of the index to used when accessing values array.
  let index;
  const values = Object.values(props);
  Object.keys(props).forEach((k, idx) => {
    index = idx;
    let str = '';
    // loop through each letter of the key and
    // if it is a uppercase letter convert to lowercase and
    // add '-' between the words.

    // eslint-disable-next-line
    for (const i in k as any) {
      const asciiCode = k.charCodeAt(parseInt(i, 10));
      if (asciiCode >= 65 && asciiCode <= 90) {
        str = `${str}-${String.fromCharCode(
          k.charCodeAt(parseInt(i, 10)) + 32
        )}`;
      } else {
        str = `${str}${k.charAt(parseInt(i, 10))}`;
      }
    }

    (newObj as any)[str] = values[index];
  });

  return newObj;
};

/**
 * Add css prefixes.
 *
 * @param styles the styles to which prefixes will be added.
 *
 * @return styles with the added prefixes.
 */
export const addCSSPrefixes = (styles: string) =>
  serialize(compile(styles), middleware([prefixer, stringify]));
