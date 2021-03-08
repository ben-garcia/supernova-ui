/**
 * Storybook argtypes for Paragraph
 */
const argTypes = {
  align: {
    control: {
      type: 'select',
      options: ['center', 'left', 'right'],
    },
    description: 'Configure the placement of the text',
    table: {
      category: 'Typography',
      defaultValue: { summary: 'left' },
      type: { summary: 'string' },
    },
  },
  backgroundColor: {
    control: {
      type: 'color',
    },
    description: 'Configure the background color of the heading',
    table: {
      category: 'Base',
      defaultValue: { summary: 'empty' },
      type: { summary: 'string' },
    },
  },
  children: {
    control: {
      type: 'object',
    },
    description: 'React children',
    table: {
      category: 'Paragraph',
      defaultValue: { summary: '' },
      type: { summary: 'React.Children' },
    },
  },
  color: {
    control: {
      type: 'color',
    },
    description: 'Configure the color of the heading',
    table: {
      category: 'Base',
      defaultValue: { summary: 'empty' },
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
      defaultValue: { summary: 'empty' },
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
  letterSpacing: {
    control: {
      type: 'text',
    },
    description: 'Configure the letter spacing',
    table: {
      category: 'Typography',
      defaultValue: { summary: 'empty' },
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
      defaultValue: { summary: 'empty' },
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
  margin: {
    control: {
      type: 'text',
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
      type: 'text',
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
