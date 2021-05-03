import { Meta } from '@storybook/react';
import React from 'react';

import Tooltip from '.';
import Button from '../Button';

export default {
  component: Tooltip,
  title: 'Supernova UI/Atoms/Tooltip',
} as Meta;

export const Basic = () => (
  <div className="_snui-flex _snui-flex-center">
    <Tooltip content="this is the label">Hover Me</Tooltip>
  </div>
);

export const WithButton = () => (
  <Tooltip content="this is the label">
    <Button>button</Button>
  </Tooltip>
);

export const WithPositions = () => (
  <div
    className="_snui-flex _snui-flex-column _snui-flex-center"
    style={{ gap: '50px' }}
  >
    <Tooltip content="this is the label" position="bottom">
      <Button>bottom</Button>
    </Tooltip>
    <Tooltip content="this is the label" position="left">
      <Button>left</Button>
    </Tooltip>
    <Tooltip content="this is the label" position="right">
      <Button>right</Button>
    </Tooltip>
    <Tooltip content="this is the label" position="top">
      <Button>top</Button>
    </Tooltip>
  </div>
);
