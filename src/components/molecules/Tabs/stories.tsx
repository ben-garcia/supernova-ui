import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Tab, Tabs, TabList, TabPanel, TabPanelList } from '.';

import { TabsProps } from './types';

export default {
  component: Tabs,
  title: 'Supernova UI/Molecules/Tabs',
  // NOTE: doesn't work correctly when importing from a seperate file
  argTypes: {
    activeColor: {
      control: {
        type: 'color',
      },
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
      table: {
        defaultValue: { summary: 'start' },
        type: { summary: 'select' },
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    defaultIndex: {
      table: {
        disable: true,
      },
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      table: {
        defaultValue: { summary: 'horizontal' },
        type: { summary: 'select' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'select' },
      },
    },
    isFitted: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
    isManual: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: { summary: false },
        type: { summary: 'boolean' },
      },
    },
  },
} as Meta;

const Template: Story<TabsProps> = args => (
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

export const Default = Template.bind({});

Default.args = {};

export const DefaultIndex = () => (
  <div style={{ margin: '0 auto', width: '50%' }}>
    <Tabs defaultIndex={1}>
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
