import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Box, Button, Paragraph } from '@components';
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
  title: 'Supernova UI/Feedback/Notification',
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
    <Box position="relative">
      <Button onClick={handleClick}>Trigger notification</Button>
    </Box>
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
        <Box display="flex" padding="var(--snui-space-sm)">
          <Button onClick={onClose}>X</Button>
          <Box
            display="flex"
            flexDirection="column"
            margin="var(--snui-space-sm)"
          >
            <Paragraph>custom title</Paragraph>
            <Paragraph>custom message</Paragraph>
          </Box>
        </Box>
      ),
    });
  };

  return <Button onClick={handleTemplate}>Open</Button>;
};

export const WithCustom = WithCustomTemplate.bind({});
WithCustom.parameters = parameters;
