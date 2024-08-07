import { StoryObj, Meta, StoryFn } from '@storybook/react';
import React from 'react';

import {
  AddIcon,
  AttachmentIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckmarkIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CloseIcon,
  ConnectivityIcon,
  DownloadIcon,
  EditIcon,
  EnvelopIcon,
  HalfMoonIcon,
  HelpIcon,
  InfoIcon,
  LinkIcon,
  LogoutIcon,
  SearchIcon,
  SettingsIcon,
  TrashIcon,
  TriangleDownIcon,
  TriangleUpIcon,
  UserIcon,
} from './Icons';

export default {
  argTypes: {
    color: { control: 'color', defaultValue: '#000' },
    size: {
      control: 'select',
      defaultValue: 'xs',
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'],
    },
  },
  title: 'Supernova UI/Media and icons/Icons',
} as Meta<any>;

export const All: StoryObj<any> = {
  render: args => (
    <div>
      <AddIcon {...args} />
      <AttachmentIcon {...args} />
      <ArrowDownIcon {...args} />
      <ArrowLeftIcon {...args} />
      <ArrowRightIcon {...args} />
      <ArrowUpIcon {...args} />
      <CheckmarkIcon {...args} />
      <ChevronDownIcon {...args} />
      <ChevronLeftIcon {...args} />
      <ChevronRightIcon {...args} />
      <ChevronUpIcon {...args} />
      <CloseIcon {...args} />
      <ConnectivityIcon {...args} />
      <DownloadIcon {...args} />
      <EditIcon {...args} />
      <EnvelopIcon {...args} />
      <HalfMoonIcon {...args} />
      <HelpIcon {...args} />
      <InfoIcon {...args} />
      <LinkIcon {...args} />
      <LogoutIcon {...args} />
      <SearchIcon {...args} />
      <SettingsIcon {...args} />
      <TrashIcon {...args} />
      <TriangleDownIcon {...args} />
      <TriangleUpIcon {...args} />
      <UserIcon {...args} />
    </div>
  ),

  args: {},
};
