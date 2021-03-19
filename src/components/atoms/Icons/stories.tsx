import React from 'react';
import { Meta } from '@storybook/react';

import { AddIcon } from '.';

export default {
  title: 'Supernova UI/Atoms/Icons',
} as Meta;

export const Icons = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    <AddIcon width="3rem" />
  </div>
);
