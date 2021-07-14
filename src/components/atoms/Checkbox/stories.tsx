import { Meta } from '@storybook/react';
import React from 'react';

import Checkbox from '.';
import { UserIcon } from '../Icon/Icons';
import argTypes from './argTypes';

export default {
  argTypes,
  component: Checkbox,
  title: 'Supernova UI/Atoms/Checkbox',
} as Meta;

const label = 'Reveal your secrets?';

export const Controlled = () => {
  const [checked, setChecked] = React.useState(true);

  return (
    <>
      <Checkbox
        isChecked={checked}
        onChange={() => setChecked(!checked)}
        label={label}
      />
      <p>{`checked: ${JSON.stringify(checked)}`}</p>
    </>
  );
};

export const CustomBackgroundColors = () => (
  <div className="snui-flex sniu-flex-center">
    <Checkbox
      backgroundColor="error600"
      isChecked
      label="error600"
      margin="0 sm"
    />
    <Checkbox
      backgroundColor="warning600"
      isChecked
      label="warning600"
      margin="0 sm"
    />
    <Checkbox
      backgroundColor="success600"
      isChecked
      label="success600"
      margin="0 sm"
    />
    <Checkbox
      backgroundColor="cyan600"
      isChecked
      label="cyan600"
      margin="0 sm"
    />
    <Checkbox
      backgroundColor="info400"
      isChecked
      label="info400"
      margin="0 sm"
    />
  </div>
);

export const Disabled = () => <Checkbox isDisabled label={label} />;

export const Default = () => <Checkbox label={label} />;

export const Sizes = () => (
  <div className="snui-flex sniu-flex-center">
    <Checkbox isChecked label="xs" margin="0 sm" size="xs" />
    <Checkbox isChecked label="sm" margin="0 sm" size="sm" />
    <Checkbox isChecked label="md" margin="0 sm" size="md" />
    <Checkbox isChecked label="lg" margin="0 sm" size="lg" />
    <Checkbox isChecked label="xl" margin="0 sm" size="xl" />
    <Checkbox isChecked label="xxl" margin="0 sm" size="xxl" />
  </div>
);

export const WithComponentAsLabel = () => (
  <Checkbox
    isChecked
    label={
      <>
        <UserIcon margin="0 xs" size="1rem" />
        component
      </>
    }
    margin="0 sm"
  />
);
