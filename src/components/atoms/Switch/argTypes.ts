/**
 * Storybook argtypes for TextInput
 */
const argTypes = {
  backgroundColor: {
    control: {
      type: 'color',
    },
    description: 'Configure the background color',
    table: {
      category: 'Base',
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
      type: 'text',
    },
    description: 'Configure the box shadow',
    table: {
      category: 'Common',
      defaultValue: { summary: '' },
      type: { summary: 'string' },
    },
  },
  color: {
    control: {
      type: 'color',
    },
    description: 'Configure the foreground color',
    table: {
      category: 'Base',
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
      defaultValue: { summary: false },
      type: { summary: 'boolean' },
    },
  },
  leftIcon: {
    table: {
      disable: true,
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
  onChange: {
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
      category: 'Common',
      defaultValue: { summary: 'md' },
      type: { summary: 'string' },
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
  value: {
    table: {
      disable: true,
    },
  },
  variant: {
    control: {
      type: 'select',
      options: ['filled', 'flushed', 'outline'],
    },
    description: 'Configure the type of button',
    table: {
      category: 'TextInput',
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
