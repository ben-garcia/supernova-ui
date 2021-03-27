/**
 * Storybook argtypes for Button
 */
const argTypes = {
  backgroundColor: {
    control: {
      type: 'color',
    },
    description: 'Configure the background color',
    table: {
      category: 'Button',
      defaultValue: { summary: '' },
      type: { summary: 'string' },
    },
  },
  borderRadius: {
    control: {
      type: 'text',
    },
    description: 'Configure the border radius',
    table: {
      category: 'Common',
      defaultValue: { summary: '' },
      type: { summary: 'string' },
    },
  },
  boxShadow: {
    control: {
      type: 'object',
    },
    description: 'Configure the box shadow',
    table: {
      category: 'Common',
      defaultValue: { summary: '' },
      type: { summary: 'object' },
    },
  },
  children: {
    control: {
      type: 'object',
    },
    description: 'Configure the childrenn',
    table: {
      category: 'Button',
      defaultValue: { summary: undefined },
      type: { summary: 'object' },
    },
  },
  color: {
    control: {
      type: 'color',
    },
    description: 'Configure the foreground color',
    table: {
      category: 'Button',
      defaultValue: { summary: '' },
      type: { summary: 'string' },
    },
  },
  font: {
    control: {
      type: 'text',
    },
    description: 'Configure the font family',
    table: {
      category: 'Typography',
      defaultValue: { summary: 'body' },
      type: { summary: 'string' },
    },
  },
  fontSize: {
    control: {
      type: 'text',
    },
    description: 'Configure the font size',
    table: {
      category: 'Typography',
      defaultValue: { summary: 'md' },
      type: { summary: 'string' },
    },
  },
  fontWeight: {
    control: {
      type: 'text',
    },
    description: 'Configure the font weight',
    table: {
      category: 'Typography',
      defaultValue: { summary: 'lg' },
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
  hoverBackgroundColor: {
    control: {
      type: 'color',
    },
    description: 'Configure the background color when hovering',
    table: {
      category: 'Common',
      defaultValue: { summary: '' },
      type: { summary: 'string' },
    },
  },
  hoverColor: {
    control: {
      type: 'color',
    },
    description: 'Configure the color when hovering',
    table: {
      category: 'Common',
      defaultValue: { summary: '' },
      type: { summary: 'string' },
    },
  },
  isDisabled: {
    control: {
      type: 'boolean',
    },
    description: 'Configure the disabled state',
    table: {
      category: 'Common',
      defaultValue: { summary: false },
      type: { summary: 'boolean' },
    },
  },
  isLoading: {
    control: {
      type: 'boolean',
    },
    description: 'Configure the loading state',
    table: {
      category: 'Common',
      defaultValue: { summary: false },
      type: { summary: 'boolean' },
    },
  },
  letterSpacing: {
    control: {
      type: 'text',
    },
    description: 'Configure the letter spacing',
    table: {
      category: 'Typography',
      defaultValue: { summary: 'md' },
      type: { summary: 'string' },
    },
  },
  lineHeight: {
    control: {
      type: 'text',
    },
    description: 'Configure the line height',
    table: {
      category: 'Typography',
      defaultValue: { summary: 'lg' },
      type: { summary: 'string' },
    },
  },
  isTruncated: {
    control: {
      type: 'boolean',
    },
    description: 'Show ellipsis when text exceeds its width',
    table: {
      category: 'Typography',
      defaultValue: { summary: 'false' },
      type: { summary: 'boolean' },
    },
  },
  leftIcon: {
    table: {
      disable: true,
    },
  },
  loadingText: {
    control: {
      type: 'text',
    },
    description: 'Configure the text to be shown alongside the spinner',
    table: {
      category: 'Button',
      defaultValue: { summary: '' },
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
  onClick: {
    table: {
      disable: true,
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
  rightIcon: {
    table: {
      disable: true,
    },
  },
  size: {
    control: {
      type: 'text',
    },
    description: 'Configure the size of the icon',
    table: {
      category: 'Button',
      defaultValue: { summary: 'empty' },
      type: { summary: 'string' },
    },
  },
  spinner: {
    table: {
      disable: true,
    },
  },
  textTransform: {
    control: {
      type: 'select',
      options: ['capitalize', 'lowercase', 'uppercase'],
    },
    description: 'Configure the text transform',
    table: {
      category: 'Typography',
      defaultValue: { summary: 'capitalize' },
      type: { summary: 'string' },
    },
  },
  variant: {
    control: {
      type: 'select',
      options: ['filled', 'outline'],
    },
    description: 'Configure the type of button',
    table: {
      category: 'Button',
      defaultValue: { summary: 'filled' },
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
