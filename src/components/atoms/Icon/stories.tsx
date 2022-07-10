import React from 'react';
import { Meta, Story } from '@storybook/react';

import { IconProps } from './types';

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
    fill: { control: 'color' },
    size: { control: 'text' },
  },
  title: 'Supernova UI/Atoms/Icons',
} as Meta;

export const All: Story<IconProps> = args => (
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
);

All.args = {
  size: '4rem',
};
