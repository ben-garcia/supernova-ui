import { Meta } from '@storybook/react';

import Textarea from '.';

export default {
  args: {
    isAutoResize: true,
    isDiabled: false,
    variant: 'outline',
  },
  argTypes: {
    isAutoResize: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    variant: {
      control: { type: 'radio' },
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
