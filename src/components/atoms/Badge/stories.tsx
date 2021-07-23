import { Meta, Story } from '@storybook/react';
import React from 'react';

import Badge from '.';
import { BadgeProps } from './types';
import argTypes from './argTypes';
import { sizes } from '../../../utils';

export default {
  argTypes,
  component: Badge,
  title: 'Supernova UI/Atoms/Badge',
} as Meta;

const Template: Story<BadgeProps> = args => <Badge {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'badge',
};

export const Sizes = () => (
  <div>
    <div style={{ margin: '10px 0' }}>
      {sizes.map(size => (
        <>
          <Badge fontSize={size} key={size} margin="0 sm">
            {`${size}`}
          </Badge>
        </>
      ))}
    </div>
  </div>
);

export const Variants = () => (
  <div>
    <Badge margin="0 sm" variant="outline">
      outline
    </Badge>

    <Badge margin="0 sm" variant="solid">
      solid
    </Badge>
  </div>
);
