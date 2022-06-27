/**
 * check whether a value is a function
 *
 * @param value the variable to check against
 *
 * @return result whether value is of type function
 */
export const isFunction = (value: any): boolean =>
  Object.prototype.toString.call(value) === '[object Function]' &&
  value !== undefined &&
  value !== null;

/**
 * check whther a value is of type number
 *
 * @param value the variable to check against
 *
 * @return result whether value is of type number
 */
export const isNumber = (value: any): boolean =>
  Object.prototype.toString.call(value) === '[object Number]' &&
  !Number.isNaN(value) &&
  value !== undefined &&
  value !== null;

/**
 * check whether a value is of type object
 *
 * @param value the variable to check against
 *
 * @return result whether value is of type object
 */
export const isObject = (value: any): boolean =>
  Object.prototype.toString.call(value) === '[object Object]' &&
  Object.keys(value).length > 0;

/**
 * check whether a value is of type string
 
 * @param value the variable to check against
 *
 * @returns result whether value is of type string
 */
export const isString = (value: any): boolean =>
  Object.prototype.toString.call(value) === '[object String]' &&
  value.trim() !== '';
