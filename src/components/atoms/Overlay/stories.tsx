import { Meta, Story } from '@storybook/react';
import React from 'react';

import Overlay, { OverlayProps } from '.';

export default {
  component: Overlay,
  title: 'Supernova UI/Atoms/Overlay',
} as Meta;

const Template: Story<OverlayProps> = args => <Overlay {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: (
    <div style={{ border: '1px solid white', color: 'white', padding: '10px' }}>
      Overlay example
    </div>
  ),
};
