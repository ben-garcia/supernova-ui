import React from 'react';
import { Meta, Story } from '@storybook/react';

import argTypes from './argTypes';
import { IconProps } from './types';

import {
  AddIcon,
  AttachmentIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckmarkIcon,
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
  argTypes,
  title: 'Supernova UI/Atoms/Icons',
} as Meta;

const Template: Story<IconProps> = args => <UserIcon {...args} />;

export const Default = Template.bind({});

Default.args = {
  size: '5rem',
};

export const All = () => (
  <div>
    <AddIcon size="3rem" />
    <AttachmentIcon size="3rem" />
    <ArrowDownIcon size="3rem" />
    <ArrowLeftIcon size="3rem" />
    <ArrowRightIcon size="3rem" />
    <ArrowUpIcon size="3rem" />
    <CheckmarkIcon size="3rem" />
    <CloseIcon size="3rem" />
    <ConnectivityIcon size="3rem" />
    <DownloadIcon size="3rem" />
    <EditIcon size="3rem" />
    <EnvelopIcon size="3rem" />
    <HalfMoonIcon size="3rem" />
    <HelpIcon size="3rem" />
    <InfoIcon size="3rem" />
    <LinkIcon size="3rem" />
    <LogoutIcon size="3rem" />
    <SearchIcon size="3rem" />
    <SettingsIcon size="3rem" />
    <TrashIcon size="3rem" />
    <TriangleDownIcon size="3rem" />
    <TriangleUpIcon size="3rem" />
    <UserIcon size="3rem" />
  </div>
);
