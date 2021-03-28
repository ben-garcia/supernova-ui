import { Meta, Story } from '@storybook/react';
import React from 'react';

import Paragraph from '.';
import { ParagraphProps } from './types';
import argTypes from './argTypes';
import { sizes } from '../../../utils';

export default {
  argTypes,
  component: Paragraph,
  title: 'Supernova UI/Atoms/Paragraph',
} as Meta;

const Template: Story<ParagraphProps> = args => <Paragraph {...args} />;

export const Default = Template.bind({});

Default.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis nulla a velit suscipit faucibus. Sed mattis ac turpis vel efficitur. Aliquam eget ligula ut diam tincidunt porta.',
};

export const All = () => (
  <div>
    {sizes.map(size => (
      <Paragraph fontSize={size} key={size} margin="10px 0">
        {`${size}:`}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis
        nulla a velit suscipit faucibus. Sed mattis ac turpis vel efficitur.
        Aliquam eget ligula ut diam tincidunt porta.
      </Paragraph>
    ))}
  </div>
);
