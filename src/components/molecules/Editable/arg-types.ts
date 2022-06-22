/**
 * Storybook arg types for Editable
 */
const argTypes = {
  defaultValue: {
    control: {
      type: 'text',
    },
    description: 'Configure the default value state',
    table: {
      category: 'Editable',
    },
  },
  isDisabled: {
    table: {
      disable: true,
    },
  },
  onCancel: {
    table: {
      disable: true,
    },
  },
  onChange: {
    table: {
      disable: true,
    },
  },
  onEdit: {
    table: {
      disable: true,
    },
  },
  placeholder: {
    control: {
      type: 'text',
    },
    description: 'Configure the placeholder text',
    table: {
      category: 'Editable',
    },
  },
  selectAllOnFocus: {
    control: {
      type: 'boolean',
    },
    description:
      'Flag that checks whether the text should be selected when focused',
    table: {
      category: 'Editable',
      defaultValue: { summary: false },
      type: { summary: 'boolean' },
    },
  },
  submitOnBlur: {
    control: {
      type: 'boolean',
    },
    description:
      'Flag use to check whether to update the value when user removes focus',
    table: {
      category: 'Editable',
      defaultValue: { summary: true },
      type: { summary: 'boolean' },
    },
  },
};

export default argTypes;
