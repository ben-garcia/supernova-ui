import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import colors from '../../theme/colors';

export default {
  title: 'Supernova UI/Other/Colors',
} as ComponentMeta<typeof Colors>;

const Template: ComponentStory<typeof Colors> = () => <Colors />;

export const All = Template.bind({});
All.parameters = {
  controls: { hideNoControlsWarning: true },
};

const Colors = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {Object.entries(colors).map(([color, hex]) => (
      <div
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 10px',
          width: '80px',
        }}
      >
        <div
          style={{
            background: hex,
            border: '1px solid #ccc',
            borderRadius: '50%',
            height: '50px',
            width: '50px',
          }}
        />
        <span style={{ fontSize: '14px' }}>{color}</span>
      </div>
    ))}
  </div>
);
