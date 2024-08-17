import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Box, Button, Paragraph } from '@components';
import { useNotification } from '@hooks';

export default {
  args: {
    duration: 5000,
    isCloseable: true,
    isPauseable: true,
    message: 'Test message',
    position: 'top-right',
    status: 'info',
    title: 'Test title',
  },
  argTypes: {
    position: {
      control: 'select',
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
      options: ['error', 'info', 'success', 'warning'],
    },
  },
  title: 'Supernova UI/Feedback/Notification',
} as Meta;

const Template: StoryFn<any> = args => {
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

export const Basic = {
  render: Template,
};

const WithCustomTemplate: StoryFn<any> = args => {
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

export const WithCustom = {
  render: WithCustomTemplate,
  parameters: {
    controls: { exclude: ['message', 'title'] },
  },
};
