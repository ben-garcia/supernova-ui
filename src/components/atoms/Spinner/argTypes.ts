/**
 * Storybook argtypes for Spinner
 */
const argTypes = {
  borderWidth: {
    control: {
      type: 'text',
    },
    description: 'Configure the border width',
    table: {
      category: 'Spinner',
      defaultValue: { summary: '4px' },
      type: { summary: 'string' },
    },
  },
  duration: {
    control: {
      type: 'text',
    },
    description: 'Configure of the animation',
    table: {
      category: 'Spinner',
      defaultValue: { summary: '1s' },
      type: { summary: 'string' },
    },
  },
  height: {
    control: {
      type: 'text',
    },
    description: 'Configure the height',
    table: {
      category: 'Base',
      defaultValue: { summary: 'empty' },
      type: { summary: 'string' },
    },
  },
  margin: {
    control: {
      type: 'object',
    },
    description: `Configure the margin (using rem, em, px, and/or %)<br />
				e.g.<br />
				m="50px"
				m="1.1rem 0.5em"
			`,
    table: {
      category: 'Base',
      defaultValue: { summary: 'empty' },
      type: { summary: 'string' },
    },
  },
  padding: {
    control: {
      type: 'object',
    },
    description: `Configure the padding (using rem, em, px, and/or %)<br />
				e.g.<br />
				p="50px"
				p="1rem 2em"
			`,
    table: {
      category: 'Base',
      defaultValue: { summary: 'empty' },
      type: { summary: 'string' },
    },
  },
  primaryColor: {
    control: {
      type: 'color',
    },
    description: 'Configure of the color of the spinner ',
    table: {
      category: 'Spinner',
      defaultValue: { summary: 'info700' },
      type: { summary: 'string' },
    },
  },
  secondaryColor: {
    control: {
      type: 'color',
    },
    description: 'Configure of the color of the empty space ',
    table: {
      category: 'Spinner',
      defaultValue: { summary: 'transparent' },
      type: { summary: 'string' },
    },
  },
  size: {
    control: {
      type: 'text',
    },
    description: 'Configure the size of the icon',
    table: {
      category: 'Spinner',
      defaultValue: { summary: 'xl' },
      type: { summary: 'string' },
    },
  },
  width: {
    control: {
      type: 'text',
    },
    description: 'Configure the width',
    table: {
      category: 'Base',
      defaultValue: { summary: 'empty' },
      type: { summary: 'string' },
    },
  },
};

export default argTypes;
