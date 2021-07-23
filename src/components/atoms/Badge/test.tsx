import React from 'react';

import Badge from '.';
import { a11yTest, mockMatchMedia, render } from '../../../test-utils';

describe('<Badge />', () => {
  beforeAll(() => mockMatchMedia());

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
