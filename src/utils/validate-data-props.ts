import { isFunction } from '@utils';

/**
 * Filter for data and aria attributes.
 */
export const validateDataAndAriaProps = (props: any) => {
  const newProps: any = {};

  Object.keys(props).forEach(key => {
    if (
      key.startsWith('data-') ||
      key.startsWith('aria-') ||
      (key.startsWith('on') && isFunction(props[key]))
    ) {
      newProps[key] = props[key];
    }
  });

  return newProps;
};

/**
 * Remove all aria-* data-* and on... props.
 */
export const filterDataAriaListernerProps = (props: any) => {
  const newProps: any = {};

  Object.keys(props).forEach(key => {
    if (
      !key.startsWith('data-') &&
      !key.startsWith('aria-') &&
      !key.startsWith('on') &&
      props[key] !== undefined &&
      props[key] !== null
    ) {
      newProps[key] = props[key];
    }
  });

  return newProps;
};
