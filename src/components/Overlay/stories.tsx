import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Box, Overlay } from '@components';

export default {
  component: Overlay,
  title: 'Supernova UI/Other/Overlay',
} as Meta<typeof Overlay>;

const Template: StoryFn<typeof Overlay> = args => (
  <Overlay {...args}>
    <Box border="1px solid white" color="white" padding="10px">
      Overlay example
    </Box>
  </Overlay>
);

export const Default = {
  render: Template,

  parameters: {
    controls: { include: [], hideNoControlsWarning: true },
  },
};
