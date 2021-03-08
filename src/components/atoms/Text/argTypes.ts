/**
 * Storybook argtypes for Heading
 */
const argTypes = {
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
      category: 'Text',
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
      defaultValue: { summary: 'heading' },
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
      defaultValue: { summary: 'xxl' },
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
      defaultValue: { summary: 'xl' },
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
  tag: {
    control: {
      type: 'select',
      options: [
        'abbr',
        'cite',
        'del',
        'em',
        'i',
        'ins',
        'kbd',
        'mark',
        's',
        'samp',
        'span',
        'sub',
        'sup',
        'u',
      ],
    },
    description: 'The html tag to render',
    table: {
      category: 'Text',
      defaultValue: { summary: 'span' },
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
      defaultValue: { summary: 'lowercase' },
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
