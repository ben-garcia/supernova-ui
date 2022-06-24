/**
 * Filter for data attributes.
 */
const validateDataProps = (props: any) => {
  const newProps: any = {};

  Object.keys(props).forEach(key => {
    if (key.startsWith('data-')) {
      newProps[key] = props[key];
    }
  });

  return newProps;
};

export default validateDataProps;
