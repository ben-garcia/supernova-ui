import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Tab, Tabs, TabList, TabPanel, TabPanelList } from '@components';
import { colors } from '@utils';

export default {
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
      defaultValue: 'horizontal',
      options: ['horizontal', 'vertical'],
    },
    isFitted: {
      control: 'boolean',
      defaultValue: false,
    },
    isManual: {
      control: 'boolean',
      defaultValue: false,
    },
    size: {
      control: 'select',
      defaultValue: 'md',
      options: ['sm', 'md', 'lg'],
    },
  },
  component: Tabs,
  title: 'Supernova UI/Disclosure/Tabs',
} as Meta<typeof Tabs>;

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

const Template: StoryFn<typeof Tabs> = args => (
  <Tabs {...args}>
    <TabList>
      <Tab>one</Tab>
      <Tab>two</Tab>
      <Tab>three</Tab>
    </TabList>

    <TabPanelList>
      <TabPanel>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Tellus in hac
        habitasse platea dictumst vestibulum. Bibendum est ultricies integer
        quis auctor elit sed.
      </TabPanel>
      <TabPanel>
        Velit egestas dui id ornare. Vulputate mi sit amet mauris commodo quis
        imperdiet. In fermentum posuere urna nec. Proin nibh nisl condimentum id
        venenatis a condimentum vitae sapien. Gravida quis blandit turpis
        cursus.
      </TabPanel>
      <TabPanel>
        met cursus sit amet dictum sit amet justo donec enim. Sapien eget mi
        proin sed libero enim sed faucibus turpis. Feugiat sed lectus vestibulum
        mattis.
      </TabPanel>
    </TabPanelList>
  </Tabs>
);

export const Basic = {
  render: Template,
  args: {},
  parameters: parameters,
};
