import { Meta } from '@storybook/react';
import React from 'react';

import Accordion from '.';
import AccordionHeaderButton from './AccordionHeaderButton';
import AccordionPanel from './AccordionPanel';
import AccordionItem from './AccordionItem';

export default {
  component: Accordion,
  title: 'Supernova UI/Molecules/Accordion',
} as Meta;

export const Default = () => (
  <div style={{ margin: '0 auto', width: '50%' }}>
    <Accordion>
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

export const AllowMultiple = () => (
  <div style={{ margin: '0 auto', width: '50%' }}>
    <Accordion allowMultiple>
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

export const AllowToggle = () => (
  <div style={{ margin: '0 auto', width: '50%' }}>
    <Accordion allowToggle>
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

export const DefaultIndex = () => (
  <div style={{ margin: '0 auto', width: '50%' }}>
    <Accordion defaultIndex={[1]}>
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
