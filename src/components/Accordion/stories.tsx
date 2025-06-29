import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import {
  Accordion,
  AccordionHeaderButton,
  AccordionItem,
  AccordionPanel,
} from '@components';

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
  component: Accordion,
  title: 'Supernova UI/Disclosure/Accordion',
} as Meta<typeof Accordion>;

const parameters = {
  controls: { include: ['allowMultiple', 'allowToggle', 'defaultIndices'] },
};

const Template: StoryFn<typeof Accordion> = args => (
  <Accordion {...args}>
    <AccordionItem>
      <AccordionHeaderButton>Section 1</AccordionHeaderButton>
      <AccordionPanel>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Tellus in hac
        habitasse platea dictumst vestibulum. Bibendum est ultricies integer
        quis auctor elit sed.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <AccordionHeaderButton>Section 2</AccordionHeaderButton>
      <AccordionPanel>
        Velit egestas dui id ornare. Vulputate mi sit amet mauris commodo quis
        imperdiet. In fermentum posuere urna nec. Proin nibh nisl condimentum id
        venenatis a condimentum vitae sapien. Gravida quis blandit turpis
        cursus.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem>
      <AccordionHeaderButton>Section 3</AccordionHeaderButton>
      <AccordionPanel>
        met cursus sit amet dictum sit amet justo donec enim. Sapien eget mi
        proin sed libero enim sed faucibus turpis. Feugiat sed lectus vestibulum
        mattis.
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export const Basic = {
  args: {
    defaultIndices: [1],
  },
  render: Template,
  parameters,
};
