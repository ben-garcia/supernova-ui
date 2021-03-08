import { Meta, Story } from '@storybook/react';
import React from 'react';

import Text from '.';
import { TextProps } from './types';
import argTypes from './argTypes';

export default {
  argTypes,
  component: Text,
  title: 'Supernova UI/Atoms/Text',
} as Meta;

const Template: Story<TextProps> = args => <Text {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: 'text',
};

const sizes = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

export const All = () => (
  <div>
    <div style={{ margin: '10px 0' }}>
      {sizes.map(size => (
        <>
          <Text fontSize={size} key={size}>
            {`Text (${size})`}
          </Text>
          <br />
        </>
      ))}
    </div>
    <div style={{ width: '250px', display: 'flex' }}>
      <Text isTruncated>parent must have a width. truncated</Text>
    </div>
    <div>
      <Text tag="abbr" margin="2px 0">
        abbreviation
      </Text>
      <br />
      <Text tag="cite" margin="2px 0">
        citation
      </Text>
      <br />
      <Text tag="del" margin="2px 0">
        delete
      </Text>
      <br />
      <Text tag="em" margin="2px 0">
        emphasis
      </Text>
      <br />
      <Text tag="i" margin="2px 0">
        italic
      </Text>
      <br />
      <Text tag="ins" margin="2px 0">
        insert
      </Text>
      <br />
      <Text tag="kbd" margin="2px 0">
        keyboard
      </Text>
      <br />
      <Text tag="mark" margin="2px 0">
        highlighted
      </Text>
      <br />
      <Text tag="s" margin="2px 0">
        strikethrough
      </Text>
      <br />
      <Text tag="samp" margin="2px 0">
        sample
      </Text>
      <br />
      <Text tag="sub" margin="2px 0">
        subscript
      </Text>
      <br />
      <Text tag="sup" margin="2px 0">
        supperscript
      </Text>
      <br />
      <Text tag="u" margin="2px 0">
        underline
      </Text>
    </div>
  </div>
);
