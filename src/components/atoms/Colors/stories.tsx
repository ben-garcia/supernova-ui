import React from 'react';
import { Meta } from '@storybook/react';

import colors from '../../../theme/colors';

export default {
  title: 'Atoms/Colors',
} as Meta;

let colorsToRender: any = Object.entries(colors);

colorsToRender = colorsToRender.map(([color, colorObj]: [string, any]) => {
  return Object.entries(colorObj).map(([b, value]) => (
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
          background: `${value}`,
          border: '1px solid #ccc',
          borderRadius: '50%',
          height: '50px',
          width: '50px',
        }}
      />
      <span style={{ fontSize: '14px' }}>{`${color}.${b}`}</span>
    </div>
  ));
});

export const Colors = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>{colorsToRender}</div>
);
