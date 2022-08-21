import React from 'react';

import { a11yTest, render } from '@testUtils';
import Badge from '.';

describe('<Badge />', () => {
  it('should pass a11y tests', async () => {
    await a11yTest(<Badge>badge</Badge>);
  });

  it('should render', () => {
    const { container } = render(<Badge>badge</Badge>);

    expect(container).toBeInTheDocument();
  });

  it('should render as a span', () => {
    const text = 'badge';
    const { getByText } = render(<Badge>{text}</Badge>);
    const result = getByText(text);

    expect(result.nodeName).toBe('SPAN');
  });
});
