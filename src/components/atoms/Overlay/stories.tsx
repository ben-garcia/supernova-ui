import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import Overlay from '.';

export default {
  component: Overlay,
  title: 'Supernova UI/Atoms/Overlay',
} as ComponentMeta<typeof Overlay>;

const Template: ComponentStory<typeof Overlay> = args => (
  <Overlay {...args}>
    <div style={{ border: '1px solid white', color: 'white', padding: '10px' }}>
      Overlay example
    </div>
  </Overlay>
);

export const Default = Template.bind({});
Default.parameters = {
  controls: { include: [], hideNoControlsWarning: true },
};
