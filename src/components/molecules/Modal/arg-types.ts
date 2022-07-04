/**
 * Storybook argtypes for Modal
 */
const argTypes = {
  closeOnEsc: {
    control: 'boolean',
    defaultValue: true,
  },
  closeOnOverlayClick: {
    control: 'boolean',
    defaultValue: true,
  },
  size: {
    control: 'select',
    defaultValue: 'md',
    options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
  },
};
export default argTypes;
