import { Meta, StoryFn } from '@storybook/react-webpack5';
import React from 'react';

import { Accordion } from '@components';

export default {
  args: {
    allowMultiple: false,
    allowToggle: false,
  },
  argTypes: {
    allowMultiple: { control: 'boolean' },
    allowToggle: { control: 'boolean' },
    defaultIndices: { control: 'object' },
  },
  component: Accordion.Root,
  title: 'Supernova UI/Disclosure/Accordion',
} as Meta<typeof Accordion.Root>;

const parameters = {
  controls: { include: ['allowMultiple', 'allowToggle', 'defaultIndices'] },
};

const Template: StoryFn<typeof Accordion.Root> = args => (
  <Accordion.Root {...args}>
    <Accordion.Item>
      <Accordion.HeaderButton>Section 1</Accordion.HeaderButton>
      <Accordion.Panel>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Tellus in hac
        habitasse platea dictumst vestibulum. Bibendum est ultricies integer
        quis auctor elit sed.
      </Accordion.Panel>
    </Accordion.Item>

    <Accordion.Item>
      <Accordion.HeaderButton>Section 2</Accordion.HeaderButton>
      <Accordion.Panel>
        Velit egestas dui id ornare. Vulputate mi sit amet mauris commodo quis
        imperdiet. In fermentum posuere urna nec. Proin nibh nisl condimentum id
        venenatis a condimentum vitae sapien. Gravida quis blandit turpis
        cursus.
      </Accordion.Panel>
    </Accordion.Item>

    <Accordion.Item>
      <Accordion.HeaderButton>Section 3</Accordion.HeaderButton>
      <Accordion.Panel>
        met cursus sit amet dictum sit amet justo donec enim. Sapien eget mi
        proin sed libero enim sed faucibus turpis. Feugiat sed lectus vestibulum
        mattis.
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion.Root>
);

export const Basic = {
  args: {
    defaultIndices: [1],
  },
  render: Template,
  parameters,
};
