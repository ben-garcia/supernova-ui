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
  NextIcon,
  PreviousIcon,
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

export const Single = Template.bind({});

Single.args = {
  width: '3rem',
};

export const All = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <AddIcon width="3rem" />
    <AttachmentIcon width="3rem" />
    <ArrowDownIcon width="3rem" />
    <ArrowLeftIcon width="3rem" />
    <ArrowRightIcon width="3rem" />
    <ArrowUpIcon width="3rem" />
    <CheckmarkIcon width="3rem" />
    <CloseIcon width="3rem" />
    <ConnectivityIcon width="3rem" />
    <DownloadIcon width="3rem" />
    <EditIcon width="3rem" />
    <EnvelopIcon width="3rem" />
    <HalfMoonIcon width="3rem" />
    <HelpIcon width="3rem" />
    <InfoIcon width="3rem" />
    <LinkIcon width="3rem" />
    <LogoutIcon width="3rem" />
    <NextIcon width="3rem" />
    <PreviousIcon width="3rem" />
    <SearchIcon width="3rem" />
    <SettingsIcon width="3rem" />
    <TrashIcon width="3rem" />
    <TriangleDownIcon width="3rem" />
    <TriangleUpIcon width="3rem" />
    <UserIcon width="3rem" />
  </div>
);
