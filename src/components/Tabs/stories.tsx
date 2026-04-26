import { Meta, StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { Tabs } from '@components';
import { colors } from '@utils';

export default {
  args: {
    colorVariant: 'primary',
    orientation: 'horizontal',
    isFitted: false,
    isManual: false,
    size: 'md',
  },
  argTypes: {
    colorVariant: {
      control: 'select',
      options: colors,
    },
    defaultIndex: {
      control: 'object',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    isFitted: {
      control: 'boolean',
    },
    isManual: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  component: Tabs.Root,
  title: 'Supernova UI/Disclosure/Tabs',
} as Meta<typeof Tabs.Root>;

const parameters = {
  controls: {
    include: [
      'colorVariant',
      'defaultIndex',
      'orientation',
      'isFitted',
      'isManual',
      'size',
    ],
  },
};

const Template: StoryFn<typeof Tabs.Root> = args => (
  <Tabs.Root {...args}>
    <Tabs.ItemList>
      <Tabs.Item>one</Tabs.Item>
      <Tabs.Item>two</Tabs.Item>
      <Tabs.Item>three</Tabs.Item>
    </Tabs.ItemList>

    <Tabs.PanelList>
      <Tabs.Panel>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Tellus in hac
        habitasse platea dictumst vestibulum. Bibendum est ultricies integer
        quis auctor elit sed.
      </Tabs.Panel>
      <Tabs.Panel>
        Velit egestas dui id ornare. Vulputate mi sit amet mauris commodo quis
        imperdiet. In fermentum posuere urna nec. Proin nibh nisl condimentum id
        venenatis a condimentum vitae sapien. Gravida quis blandit turpis
        cursus.
      </Tabs.Panel>
      <Tabs.Panel>
        met cursus sit amet dictum sit amet justo donec enim. Sapien eget mi
        proin sed libero enim sed faucibus turpis. Feugiat sed lectus vestibulum
        mattis.
      </Tabs.Panel>
    </Tabs.PanelList>
  </Tabs.Root>
);

export const Basic = {
  render: Template,
  args: {},
  parameters,
};
