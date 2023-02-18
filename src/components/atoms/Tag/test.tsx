import React from 'react';

import { a11yTest, render } from '@testUtils';
import Tag from '.';

describe('<Tag />', () => {
  it('should pass a11y tests', async () => {
    await a11yTest(<Tag>tag</Tag>);
  });

  it('should render', () => {
    const { container } = render(<Tag>tag</Tag>);

    expect(container).toBeInTheDocument();
  });

  it('should render as a span', () => {
    const text = 'tag';
    const { getByText } = render(<Tag>{text}</Tag>);
    const result = getByText(text);

    expect(result.nodeName).toBe('SPAN');
  });
});
