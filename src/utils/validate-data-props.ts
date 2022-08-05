/**
 * Filter for data and aria attributes.
 */
const validateDataAndAriaProps = (props: any) => {
  const newProps: any = {};

  Object.keys(props).forEach(key => {
    if (
      key.startsWith('data-') ||
      key.startsWith('aria-') ||
      key.startsWith('on')
    ) {
      newProps[key] = props[key];
    }
  });

  return newProps;
};

export default validateDataAndAriaProps;
