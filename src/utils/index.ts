import { isFunction, isNumber, isObject, isString } from './assertions';
import validateDataProps from './validate-data-props';
import {
  colors,
  objectToPropertiesArray,
  radii,
  shadows,
  sizes,
} from './conversions';
import createClasses from './create-classes';
import createElement from './create-element';
import { createStyles, responsify } from './create-styles';
import deepMergify from './deep-mergify';
import { inputIsChecked } from './dom-assertions';

export * from './position';
export {
  colors,
  createClasses,
  createElement,
  createStyles,
  deepMergify,
  inputIsChecked,
  isFunction,
  isNumber,
  isObject,
  isString,
  objectToPropertiesArray,
  radii,
  responsify,
  shadows,
  sizes,
  validateDataProps,
};
