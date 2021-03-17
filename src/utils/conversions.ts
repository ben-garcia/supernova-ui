import sizesObject from '../theme/sizes';
import colorsObject from '../theme/colors';

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
 * The available sizes provided by the theme
 *
 * from smallest(xs) to largest(xxl)
 */
export const sizes = objectToPropertiesArray(sizesObject).reverse();
