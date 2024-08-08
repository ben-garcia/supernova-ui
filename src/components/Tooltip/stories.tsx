import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Box, Button, Tooltip } from '@components';
import { colors } from '@utils';

const parameters = {
  controls: {
    include: [
      'arrowSize',
      'closeDelay',
      'colorVariant',
      'isDisabled',
      'label',
      'openDelay',
      'placement',
      'spacing',
      'withArrow',
    ],
  },
};

export default {
  argTypes: {
    arrowSize: { control: { type: 'number' }, defaultValue: 10 },
    closeDelay: { control: { type: 'number' }, defaultValue: 0 },
    colorVariant: {
      control: 'select',
      options: colors,
    },
    isDisabled: { control: 'boolean', defaultValue: false },
    label: { control: 'text' },
    openDelay: { control: { type: 'number' }, defaultValue: 0 },
    placement: {
      control: 'select',
      defaultValue: 'bottom',
      options: [
        'bottom',
        'bottom-end',
        'bottom-start',
        'left',
        'left-end',
        'left-start',
        'right',
        'right-end',
        'right-start',
        'top',
        'top-end',
        'top-start',
      ],
    },
    spacing: { control: { type: 'number' }, defaultValue: 5 },
    withArrow: { control: 'boolean', defaultValue: false },
  },
  component: Tooltip,
  title: 'Supernova UI/Overlay/Tooltip',
} as Meta<typeof Tooltip>;

const Template: StoryFn<typeof Tooltip> = args => (
  <Box>
    <Tooltip {...args} />
  </Box>
);

export const Basic = {
  render: Template,

  args: {
    children: 'Hover me',
    label: 'this is the label',
  },

  parameters,
};

const WithButtonTemplate: StoryFn<typeof Tooltip> = args => (
  <Tooltip {...args}>
    <Button>button</Button>
  </Tooltip>
);

export const WithButton = {
  render: WithButtonTemplate,
  args: { label: 'this is a Button' },
  parameters,
};

const PlacementsTemplate: StoryFn<typeof Tooltip> = args => (
  <Box
    alignItems="center"
    display="flex"
    flexWrap="wrap"
    justifyContent="center"
    width="100vw"
    height="100vh"
  >
    <Box
      alignItems="center"
      display="flex"
      flexWrap="wrap"
      gap="20px"
      justifyContent="center"
      width="500px"
    >
      {[
        'top-start',
        'top',
        'top-end',
        'left-start',
        'left',
        'left-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
      ].map((p: any) => (
        <Tooltip {...args} key={p} label={p} placement={p}>
          <Button
            alignItems="center"
            display="flex"
            justifyContent="center"
            padding="20px 0"
            width="150px"
          >
            {p}
          </Button>
        </Tooltip>
      ))}
    </Box>
  </Box>
);

export const Placements = {
  render: PlacementsTemplate,
  args: {},

  parameters: {
    controls: {
      include: [
        'arrowSize',
        'closeDelay',
        'colorVariant',
        'isDisabled',
        'openDelay',
        'spacing',
        'withArrow',
      ],
    },
  },
};
