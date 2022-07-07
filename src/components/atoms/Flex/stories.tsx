import { Meta } from '@storybook/react';
import React from 'react';

import { Flex, FlexItem } from '.';

export default {
  component: Flex,
  title: 'Supernova UI/Atoms/Flex',
} as Meta;

export const Basic = () => (
  <Flex spacing={2}>
    <FlexItem xs={12}>
      <div
        className="_snui-flex _snui-flex-center"
        style={{ height: '50px', border: '1px solid black' }}
      >
        xs=12
      </div>
    </FlexItem>
    <FlexItem xs={12} sm={6}>
      <div
        className="_snui-flex _snui-flex-center"
        style={{ height: '50px', border: '1px solid black' }}
      >
        xs=12 sm=6
      </div>
    </FlexItem>
    <FlexItem xs={12} sm={6}>
      <div
        className="_snui-flex _snui-flex-center"
        style={{ height: '50px', border: '1px solid black' }}
      >
        xs=12 sm=6
      </div>
    </FlexItem>
    <FlexItem xs={6} sm={3}>
      <div
        className="_snui-flex _snui-flex-center"
        style={{ height: '50px', border: '1px solid black' }}
      >
        xs=6 sm=3
      </div>
    </FlexItem>
    <FlexItem xs={6} sm={3}>
      <div
        className="_snui-flex _snui-flex-center"
        style={{ height: '50px', border: '1px solid black' }}
      >
        xs=6 sm=3
      </div>
    </FlexItem>
    <FlexItem xs={6} sm={3}>
      <div
        className="_snui-flex _snui-flex-center"
        style={{ height: '50px', border: '1px solid black' }}
      >
        xs=6 sm=3
      </div>
    </FlexItem>
    <FlexItem xs={6} sm={3}>
      <div
        className="_snui-flex _snui-flex-center"
        style={{ height: '50px', border: '1px solid black' }}
      >
        xs=6 sm=3
      </div>
    </FlexItem>
  </Flex>
);
