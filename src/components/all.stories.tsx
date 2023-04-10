// @ts-nocheck
import React from 'react';

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Paragraph,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverBody,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Radio,
  RadioGroup,
  Tag,
  Text,
  Tooltip,
} from '@components';
import {
  Basic as RadioExample,
  WithRadioGroup as RadioGroupExample,
} from '@components/Radio/stories';
import { Basic as Slider } from '@components/Slider/stories';
import { Basic as Spinner } from '@components/Spinner/stories';
import { Basic as Switch } from '@components/Switch/stories';
import { FloatingLabel as Textarea } from '@components/Textarea/stories';
import { Basic as TextInput } from '@components/TextInput/stories';
import { Basic as Accordion } from '@components/Accordion/stories';
import { Basic as AlertDialog } from '@components/AlertDialog/stories';
import { Basic as Drawer } from '@components/Drawer/stories';
import { Basic as Modal } from '@components/Modal/stories';
import { WithInput as Editable } from '@components/Editable/stories';
import { Basic as Tabs } from '@components/Tabs/stories';
import { useNotification } from '@hooks';

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
            <FormControlExample />
            <Paragraph>Form Control</Paragraph>
          </Box>

          <Box>
            <Editable />
            <Paragraph>Editable</Paragraph>
          </Box>

          <Box>
            <RadioExample label={label} />
            <Paragraph>Radio</Paragraph>
          </Box>

          <Box>
            <RadioGroupExample />
            <Paragraph>RadioGroup</Paragraph>
          </Box>

          <Box>
            <Slider />
            <Paragraph>Slider</Paragraph>
          </Box>

          <Box>
            <Textarea label={label} />
            <Paragraph>Textarea</Paragraph>
          </Box>

          <Box>
            <TextInput label={label} />
            <Paragraph>TextInput</Paragraph>
          </Box>

          <Box>
            <Switch label={label} />
            <Paragraph>Switch</Paragraph>
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
            <MenuExample />
            <Paragraph>Menu</Paragraph>
          </Box>

          <Box>
            <PopoverExample />
            <Paragraph>Popover</Paragraph>
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

const FormControlExample = () => {
  const [answer, setAnswer] = React.useState('3.14159');
  return (
    <FormControl isInvalid={answer !== '3.14159'}>
      <RadioGroup onChange={setAnswer} defaultValue={answer} name="answer">
        <Radio label="3.14195" value="3.14195" />
        <Radio label="3.15149" value="3.15249" />
        <Radio label="3.14159" value="3.14159" />
      </RadioGroup>
      <FormHelperText>Choose the correct value of PI</FormHelperText>
      <FormErrorMessage>error has been detected</FormErrorMessage>
    </FormControl>
  );
};

const MenuExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <MenuButton onClick={() => setIsOpen(true)}>Trigger Menu</MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Settings</MenuItem>
        <MenuItem>Night Mode</MenuItem>
        <MenuItem>Sign Out</MenuItem>
      </MenuList>
    </Menu>
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

const PopoverExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen(prev => !prev);
  return (
    <Popover onClose={onClose} isOpen={isOpen} onToggle={onToggle}>
      <PopoverTrigger>
        <Button>Trigger Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>Popover Header</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>This is a popover</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
