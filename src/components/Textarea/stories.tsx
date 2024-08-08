import { Meta } from '@storybook/react';

import Textarea from '.';

export default {
  argTypes: {
    isAutoResize: { control: 'boolean', defaultValue: true },
    isDisabled: { control: 'boolean', defaultValue: false },
    variant: {
      control: { type: 'radio' },
      defaultValue: 'outline',
      options: ['filled', 'flushed', 'outline'],
    },
  },
  component: Textarea,
  title: 'Supernova UI/Form/Textarea',
} as Meta<typeof Textarea>;

const parameters = {
  controls: {
    include: ['isAutoResize', 'isDisabled', 'variant'],
  },
};
const label = 'Reveal your secrets';

export const Basic = {
  args: { label },
  parameters,
};

export const FloatingLabel = {
  args: { label },
  parameters,
};
