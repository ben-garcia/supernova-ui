import { Meta, Story } from '@storybook/react';
import React from 'react';

import Heading from '.';
import { HeadingProps } from './types';
import argTypes from './argTypes';
import { sizes } from '../../../utils';

export default {
  argTypes,
  component: Heading,
  title: 'Supernova UI/Atoms/Heading',
} as Meta;

const Template: Story<HeadingProps> = args => <Heading {...args} />;

export const Default = Template.bind({});

Default.args = {
  children: 'Supernova UI',
};

export const All = () => (
  <div>
    <div style={{ margin: '10px 0' }}>
      {sizes.map((size, index) => (
        <Heading fontSize="xxl" key={size} level={(index + 1) as any}>
          {`Heading ${index + 1} (xxl)`}
        </Heading>
      ))}
    </div>
    <div style={{ margin: '10px 0' }}>
      {sizes.map((size, index) => (
        <Heading fontSize="xl" key={size} level={(index + 1) as any}>
          {`Heading ${index + 1} (xl)`}
        </Heading>
      ))}
    </div>
    <div style={{ margin: '10px 0' }}>
      {sizes.map((size, index) => (
        <Heading fontSize="lg" key={size} level={(index + 1) as any}>
          {`Heading ${index + 1} (lg)`}
        </Heading>
      ))}
    </div>
    <div style={{ margin: '10px 0' }}>
      {sizes.map((size, index) => (
        <Heading key={size} level={(index + 1) as any}>
          {`Heading ${index + 1} (md)`}
        </Heading>
      ))}
    </div>
    <div style={{ margin: '10px 0' }}>
      {sizes.map((size, index) => (
        <Heading fontSize="sm" key={size} level={(index + 1) as any}>
          {`Heading ${index + 1} (sm)`}
        </Heading>
      ))}
    </div>
    <div style={{ margin: '10px 0' }}>
      {sizes.map((size, index) => (
        <Heading fontSize="xs" key={size} level={(index + 1) as any}>
          {`Heading ${index + 1} (xs)`}
        </Heading>
      ))}
    </div>
  </div>
);
