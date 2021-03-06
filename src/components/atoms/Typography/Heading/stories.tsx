import { Meta, Story } from '@storybook/react';
import React from 'react';

import Heading from '.';
import { HeadingProps } from './types';
import argTypes from './argTypes';

export default {
  argTypes,
  component: Heading,
  title: 'Supernova UI/Atoms/Typography/Heading',
} as Meta;

const Template: Story<HeadingProps> = args => <Heading {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: 'Supernova UI',
};

const sizes = [
  'xxxxl',
  'xxxl',
  'xxl',
  'xl',
  'lg',
  'md',
  'sm',
  'xs',
  'xxs',
  'xxxs',
  'xxxxs',
];

export const All = () => (
  <div>
    {sizes.map(size => (
      <Heading fontSize={size} key={size} lineHeight={size} tag="h1">
        {`Supernova UI (${size})`}
      </Heading>
    ))}
  </div>
);
