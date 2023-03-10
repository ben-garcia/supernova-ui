// @ts-nocheck
import React from 'react';

import {
  Tag,
  Box,
  Button,
  Checkbox,
  Divider,
  Heading,
  Paragraph,
  Portal,
  Text,
  Tooltip,
} from '@atoms';
import {
  Basic as Radio,
  WithRadioGroup as RadioGroup,
} from '@atoms/Radio/stories';
import { Basic as Slider } from '@atoms/Slider/stories';
import { Basic as Spinner } from '@atoms/Spinner/stories';
import { Basic as Switch } from '@atoms/Switch/stories';
import { FloatingLabel as Textarea } from '@atoms/Textarea/stories';
import { Basic as TextInput } from '@atoms/TextInput/stories';
import { useNotification } from '@hooks';
import { Basic as Accordion } from '@molecules/Accordion/stories';
import { Basic as AlertDialog } from '@molecules/AlertDialog/stories';
import { Basic as Drawer } from '@molecules/Drawer/stories';
import { Basic as Modal } from '@molecules/Modal/stories';
import { WithInput as Editable } from '@molecules/Editable/stories';
import { Basic as Menu } from '@molecules/Menu/stories';
import { Basic as Tabs } from '@molecules/Tabs/stories';

export default {
  title: 'Supernova UI/All',
};

export const All = () => {
  const label = React.useMemo(() => 'reveal your secrets?', []);
  return (
    <Box>
      <Box>
        <Heading>Components</Heading>
        <Paragraph>
          These are all the components that Supernova UI supports.
        </Paragraph>
      </Box>

      <Box margin="2rem 0">
        <Heading level={2} marginBottom="1rem" size="md">
          Form inputs
        </Heading>

        <Box
          display="grid"
          gap="10px"
          gridTemplateColumns={[
            'repeat(1, minmax(0px, 1fr))',
            'repeat(2, minmax(0px, 1fr))',
            'repeat(3, minmax(0px, 1fr));',
          ]}
        >
          <Box>
            <Button>Button</Button>
            <Paragraph>Button</Paragraph>
          </Box>

          <Box>
            <Checkbox label={label} />
            <Paragraph>Checkbox</Paragraph>
          </Box>

          <Box>
            <Editable />
            <Paragraph>Editable</Paragraph>
          </Box>

          <Box>
            <Radio label={label} />
            <Paragraph>Radio</Paragraph>
          </Box>

          <Box>
            <RadioGroup />
            <Paragraph>RadioGroup</Paragraph>
          </Box>

          <Box>
            <Slider />
            <Paragraph>Slider</Paragraph>
          </Box>

          <Box>
            <Switch label={label} />
            <Paragraph>Switch</Paragraph>
          </Box>

          <Box>
            <Textarea label={label} />
            <Paragraph>Textarea</Paragraph>
          </Box>

          <Box>
            <TextInput label={label} />
            <Paragraph>TextInput</Paragraph>
          </Box>
        </Box>
      </Box>

      <Box margin="2rem 0">
        <Heading level={2} marginBottom="1rem" size="md">
          Data display
        </Heading>

        <Box
          display="grid"
          gridTemplateColumns={[
            'repeat(1, minmax(0px, 1fr))',
            'repeat(2, minmax(0px, 1fr))',
            'repeat(3, minmax(0px, 1fr));',
          ]}
        >
          <Box>
            <Tag>New</Tag>
            <Paragraph>Tag</Paragraph>
          </Box>

          <Box>
            <Divider />
            <Paragraph>Divider</Paragraph>
          </Box>

          <Box>
            <Accordion />
            <Paragraph>Accordion</Paragraph>
          </Box>

          <Box>
            <Tabs />
            <Paragraph>Tabs</Paragraph>
          </Box>
        </Box>
      </Box>

      <Box margin="2rem 0">
        <Heading level={2} marginBottom="1rem" size="md">
          Feedback
        </Heading>

        <Box
          display="grid"
          gridTemplateColumns={[
            'repeat(1, minmax(0px, 1fr))',
            'repeat(2, minmax(0px, 1fr))',
            'repeat(3, minmax(0px, 1fr));',
          ]}
        >
          <Box>
            <Spinner />
            <Paragraph>Spinner</Paragraph>
          </Box>

          <Box>
            <Notification />
            <Paragraph>Notification</Paragraph>
          </Box>
        </Box>
      </Box>

      <Box margin="2rem 0">
        <Heading level={2} marginBottom="1rem" size="md">
          Overlay
        </Heading>

        <Box
          display="grid"
          gridTemplateColumns={[
            'repeat(1, minmax(0px, 1fr))',
            'repeat(2, minmax(0px, 1fr))',
            'repeat(3, minmax(0px, 1fr));',
          ]}
        >
          <Box>
            <AlertDialog />
            <Paragraph>AlertDialog</Paragraph>
          </Box>

          <Box>
            <Drawer />
            <Paragraph>Drawer</Paragraph>
          </Box>

          <Box>
            <Modal />
            <Paragraph>Modal</Paragraph>
          </Box>

          <Box>
            <Tooltip label="This is a tooltip">Hover me</Tooltip>
            <Paragraph>Tooltip</Paragraph>
          </Box>

          <Box>
            <Menu />
            <Paragraph>Menu</Paragraph>
          </Box>
        </Box>
      </Box>

      <Box margin="2rem 0">
        <Heading level={2} marginBottom="1rem" size="md">
          Typography
        </Heading>

        <Box
          display="grid"
          gridTemplateColumns={[
            'repeat(1, minmax(0px, 1fr))',
            'repeat(2, minmax(0px, 1fr))',
            'repeat(3, minmax(0px, 1fr));',
          ]}
        >
          <Box>
            <Heading>This is a Heading</Heading>
            <Paragraph>Heading</Paragraph>
          </Box>

          <Box>
            <Paragraph>This is a paragraph</Paragraph>
            <Paragraph>Paragraph</Paragraph>
          </Box>

          <Box>
            <Text>Text</Text>
            <Paragraph>Text</Paragraph>
          </Box>
        </Box>
      </Box>

      <Box margin="2rem 0">
        <Heading level={2} marginBottom="1rem" size="md">
          Other
        </Heading>

        <Box
          display="grid"
          gridTemplateColumns={[
            'repeat(1, minmax(0px, 1fr))',
            'repeat(2, minmax(0px, 1fr))',
            'repeat(3, minmax(0px, 1fr));',
          ]}
        >
          <Box>
            <Portal>This text has been rendered in a React Portal.</Portal>
            <Paragraph>Portal</Paragraph>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const Notification = () => {
  const notification = useNotification();

  const handleClick = () => {
    notification({
      title: 'Welcome to Supernova UI',
      message: 'You have opened a notification message',
    });
  };

  return (
    <Box position="relative">
      <Button onClick={handleClick}>Trigger notification</Button>
    </Box>
  );
};
