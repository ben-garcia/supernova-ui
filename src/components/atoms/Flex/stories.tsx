import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Flex, FlexItem } from '.';

export default {
  title: 'Supernova UI/Atoms/Flex',
} as ComponentMeta<typeof Default>;

const Template: ComponentStory<typeof Default> = () => <Default />;

export const Basic = Template.bind({});
Basic.parameters = {
  controls: { hideNoControlsWarning: true },
};

const Default = () => (
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
