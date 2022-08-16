import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Button } from '@atoms';
import { useNotification } from '@hooks';

export default {
  argTypes: {
    duration: { control: 'number', defaultValue: 5000 },
    isCloseable: { control: 'boolean', defaultValue: true },
    isPausable: { control: 'boolean', defaultValue: true },
    message: { control: 'text', defaultValue: 'message' },
    position: {
      control: 'select',
      defaultValue: 'top-right',
      options: [
        'bottom',
        'bottom-left',
        'bottom-right',
        'top',
        'top-left',
        'top-right',
      ],
    },
    status: {
      control: 'select',
      defaultValue: 'info',
      options: ['error', 'info', 'success', 'warning'],
    },
    title: { control: 'text', defaultValue: 'Title' },
  },
  title: 'Supernova UI/Molecules/Notification',
} as Meta;

const parameters = {
  controls: {
    include: [
      'duration',
      'isCloseable',
      'isPausable',
      'message',
      'position',
      'status',
      'title',
    ],
  },
};

const Template: Story<any> = args => {
  const notification = useNotification();

  const handleClick = () => {
    notification(args);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Button onClick={handleClick}>Open</Button>
    </div>
  );
};

export const Basic = Template.bind({});
Basic.parameters = parameters;

const WithCustomTemplate: Story<any> = args => {
  const notification = useNotification();

  const handleTemplate = () => {
    notification({
      ...args,
      render: onClose => (
        <div className="snui-flex snui-padding-sm">
          <Button onClick={onClose}>X</Button>
          <div className="snui-flex snui-flex-column snui-margin-sm">
            <p>custom title</p>
            <p>custom message</p>
          </div>
        </div>
      ),
    });
  };

  return <Button onClick={handleTemplate}>Open</Button>;
};

export const WithCustom = WithCustomTemplate.bind({});
WithCustom.parameters = parameters;
