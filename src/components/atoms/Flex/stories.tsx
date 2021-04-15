import { Meta } from '@storybook/react';
import React from 'react';

import Flex from '.';
import FlexItem from './FlexItem';

export default {
  component: Flex,
  title: 'Supernova UI/Atoms/Flex',
} as Meta;

export const Basic = () => (
  <Flex spacing={2}>
    <FlexItem md={4} lg={6}>
      <div
        className="_snui-flex _snui-flex-center"
        style={{ height: '50px', border: '1px solid black' }}
      >
        md=4 lg=6
      </div>
    </FlexItem>
    <FlexItem md={4} lg={6}>
      <div
        className="_snui-flex _snui-flex-center"
        style={{ height: '50px', border: '1px solid black' }}
      >
        md=4 lg=6
      </div>
    </FlexItem>
    <FlexItem md={4} lg={6}>
      <div
        className="_snui-flex _snui-flex-center"
        style={{ height: '50px', border: '1px solid black' }}
      >
        md=4 lg=6
      </div>
    </FlexItem>
  </Flex>
);
