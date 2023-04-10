import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import {
  Accordion,
  AccordionHeaderButton,
  AccordionItem,
  AccordionPanel,
} from '@components';

export default {
  argTypes: {
    allowMultiple: { control: 'boolean', defaultValue: false },
    allowToggle: { control: 'boolean', defaultValue: false },
    defaultIndices: { control: 'object' },
  },
  component: Accordion,
  title: 'Supernova UI/Disclosure/Accordion',
} as ComponentMeta<typeof Accordion>;

const parameters = {
  controls: { include: ['allowMultiple', 'allowToggle', 'defaultIndices'] },
};

const Template: ComponentStory<typeof Accordion> = args => (
  <div>
    <Accordion {...args}>
      <AccordionItem>
        <AccordionHeaderButton>Section 1</AccordionHeaderButton>
        <AccordionPanel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus in
          hac habitasse platea dictumst vestibulum. Bibendum est ultricies
          integer quis auctor elit sed.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionHeaderButton>Section 2</AccordionHeaderButton>
        <AccordionPanel>
          Velit egestas dui id ornare. Vulputate mi sit amet mauris commodo quis
          imperdiet. In fermentum posuere urna nec. Proin nibh nisl condimentum
          id venenatis a condimentum vitae sapien. Gravida quis blandit turpis
          cursus.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionHeaderButton>Section 3</AccordionHeaderButton>
        <AccordionPanel>
          met cursus sit amet dictum sit amet justo donec enim. Sapien eget mi
          proin sed libero enim sed faucibus turpis. Feugiat sed lectus
          vestibulum mattis.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </div>
);

export const Basic = Template.bind({});
Basic.parameters = parameters;
