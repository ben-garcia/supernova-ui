import { Meta } from '@storybook/react';
import React from 'react';

import Radio from '.';
import RadioGroup from './RadioGroup';
import argTypes from './argTypes';

export default {
  argTypes,
  component: Radio,
  title: 'Supernova UI/Atoms/Radio',
} as Meta;

export const Direction = () => {
  const [framework, setFramework] = React.useState('react');
  const [language, setLanguage] = React.useState('typescript');
  return (
    <div className="_snui-flex _snui-flex-column _snui-flex-center">
      <div className="_snui-margin-y-md">
        <p className="_snui-margin-y-sm">Favorite framework/library</p>
        <RadioGroup
          defaultValue={framework}
          name="frameworks"
          onChange={setFramework}
        >
          <Radio label="angular" margin="0 sm" value="angular" />
          <Radio label="react" margin="0 sm" value="react" />
          <Radio label="vue" margin="0 sm" value="vue" />
        </RadioGroup>
      </div>
      <div>
        <p className="_snui-margin-y-sm">Favorite language</p>
        <RadioGroup
          defaultValue={language}
          direction="column"
          name="languages"
          onChange={setLanguage}
        >
          <Radio label="javascript" margin="sm sm" value="javascript" />
          <Radio label="typescript" margin="sm sm" value="typescript" />
        </RadioGroup>
      </div>
    </div>
  );
};

export const Disabled = () => {
  const [value, setValue] = React.useState('one');
  return (
    <RadioGroup defaultValue={value} name="disabled-story" onChange={setValue}>
      <Radio label="one" margin="0 sm" value="one" />
      <Radio label="two" margin="0 sm" value="two" />
      <Radio isDisabled label="disabled" margin="0 sm" value="three" />
    </RadioGroup>
  );
};

export const Sizes = () => {
  const [size, setSize] = React.useState('md');
  return (
    <RadioGroup defaultValue={size} name="sizes" onChange={setSize}>
      <Radio label="xs" margin="0 sm" size="xs" value="xs" />
      <Radio label="sm" margin="0 sm" size="sm" value="sm" />
      <Radio label="md" margin="0 sm" size="md" value="md" />
      <Radio label="lg" margin="0 sm" size="lg" value="lg" />
      <Radio label="xl" margin="0 sm" size="xl" value="xl" />
      <Radio label="xxl" margin="0 sm" size="xxl" value="xxl" />
    </RadioGroup>
  );
};
