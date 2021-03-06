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

export const All = () => (
  <div>
    <Heading fontSize="xxxxl" lineHeight="xxxxl">
      (xxxxl) Supernova UI
    </Heading>
    <Heading fontSize="xxxl" lineHeight="xxxl">
      (xxxl) Supernova UI
    </Heading>
    <Heading fontSize="xxl" lineHeight="xxl">
      (xxl) Supernova UI
    </Heading>
    <Heading fontSize="xl" lineHeight="xl" tag="h2">
      (xl) Supernova UI
    </Heading>
    <Heading fontSize="lg" lineHeight="lg" tag="h3">
      (lg) Supernova UI
    </Heading>
    <Heading fontSize="md" lineHeight="md" tag="h4">
      (md) Supernova UI
    </Heading>
    <Heading fontSize="sm" lineHeight="sm" tag="h5">
      (sm) Supernova UI
    </Heading>
    <Heading fontSize="xs" lineHeight="xs" tag="h5">
      (xs) Supernova UI
    </Heading>
    <Heading fontSize="xxs" lineHeight="xs" tag="h5">
      (xxs) Supernova UI
    </Heading>
    <Heading fontSize="xxxs" lineHeight="xs" tag="h5">
      (xxxs) Supernova UI
    </Heading>
    <Heading fontSize="xxxxs" lineHeight="xs" tag="h6">
      (xxxxs) Supernova UI
    </Heading>
  </div>
);
