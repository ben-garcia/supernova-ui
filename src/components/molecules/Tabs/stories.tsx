import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Tab, Tabs, TabList, TabPanel, TabPanelList } from '.';

export default {
  argTypes: {
    activeColor: {
      control: 'color',
    },
    defaultIndex: {
      control: 'object',
    },
    orientation: {
      control: 'select',
      defaultValue: 'horizontal',
      options: ['horizontal', 'vertical'],
    },
    size: {
      control: 'select',
      defaultValue: 'md',
      options: ['sm', 'md', 'lg'],
    },
    isFitted: {
      control: 'boolean',
      defaultValue: false,
    },
    isManual: {
      control: 'boolean',
      defaultValue: false,
    },
  },
  component: Tabs,
  title: 'Supernova UI/Molecules/Tabs',
} as ComponentMeta<typeof Tabs>;

const parameters = {
  controls: {
    include: [
      'activeColor',
      'defaultIndex',
      'orientation',
      'size',
      'isFitted',
      'isManual',
    ],
  },
};

const Template: ComponentStory<typeof Tabs> = args => (
  <div style={{ margin: '0 auto', width: '50%' }}>
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
  </div>
);

export const Basic = Template.bind({});

Basic.args = {};
Basic.parameters = parameters;
