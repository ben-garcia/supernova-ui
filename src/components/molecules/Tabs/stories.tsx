import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Tab, Tabs, TabList, TabPanel, TabPanelList } from '@molecules';
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
  title: 'Supernova UI/Molecules/Tabs',
} as ComponentMeta<typeof Tabs>;

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

const Template: ComponentStory<typeof Tabs> = args => (
  <Tabs {...args}>
    <TabList>
      <Tab>one</Tab>
      <Tab>two</Tab>
      <Tab>three</Tab>
    </TabList>

    <TabPanelList>
      <TabPanel>panel one</TabPanel>
      <TabPanel>panel two</TabPanel>
      <TabPanel>panel three</TabPanel>
    </TabPanelList>
  </Tabs>
);

export const Basic = Template.bind({});

Basic.args = {};
Basic.parameters = parameters;
