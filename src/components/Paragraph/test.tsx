import React from 'react';

import { Paragraph } from '@components';
import { a11yTest, render } from '@test-utils';

describe('<Paragraph />', () => {
  it('should pass a11y tests', async () => {
    await a11yTest(
      <Paragraph>this paragraph contain the secrets of the universe.</Paragraph>
    );
  });

  it('should render', () => {
    const { container } = render(<Paragraph>paragraph</Paragraph>);

    expect(container).toBeInTheDocument();
  });

  it('should render as p with correct text', () => {
    const text = 'this is another paragraph';
    const { getByText } = render(<Paragraph>{text}</Paragraph>);
    const result = getByText(text);

    expect(result.nodeName).toBe('P');
    expect(result.textContent).toBe(text);
  });
});
