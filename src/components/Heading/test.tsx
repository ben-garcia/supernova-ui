import React from 'react';

import { Heading } from '@components';
import { a11yTest, render } from '@test-utils';

describe('<Heading />', () => {
  it('should pass a11y tests', async () => {
    await a11yTest(<Heading>Heading</Heading>);
  });

  it('should render', () => {
    const { container } = render(<Heading>Heading</Heading>);

    expect(container).toBeInTheDocument();
  });

  describe('level prop', () => {
    it('should render an h1 by default with correct text', () => {
      const text = 'h1 tag';
      const { getByText } = render(<Heading>{text}</Heading>);
      const result = getByText(text);

      expect(result.nodeName).toBe('H1');
      expect(result.textContent).toBe(text);
    });

    it('should render as an h2 when passing level 2 prop', () => {
      const text = 'h2 tag';
      const { getByText } = render(<Heading level={2}>{text}</Heading>);
      const result = getByText(text);

      expect(result.nodeName).toBe('H2');
      expect(result.textContent).toBe(text);
    });

    it('should render as an h3 when passing level 3 prop', () => {
      const text = 'h3 tag';
      const { getByText } = render(<Heading level={3}>{text}</Heading>);
      const result = getByText(text);

      expect(result.nodeName).toBe('H3');
      expect(result.textContent).toBe(text);
    });

    it('should render as an h4 when passing level 4 prop', () => {
      const text = 'h4 tag';
      const { getByText } = render(<Heading level={4}>{text}</Heading>);
      const result = getByText(text);

      expect(result.nodeName).toBe('H4');
      expect(result.textContent).toBe(text);
    });

    it('should render as an h5 when passing level 5 prop', () => {
      const text = 'h5 tag';
      const { getByText } = render(<Heading level={5}>{text}</Heading>);
      const result = getByText(text);

      expect(result.nodeName).toBe('H5');
      expect(result.textContent).toBe(text);
    });

    it('should render as an h6 when passing level 6 prop', () => {
      const text = 'h6 tag';
      const { getByText } = render(<Heading level={6}>{text}</Heading>);
      const result = getByText(text);

      expect(result.nodeName).toBe('H6');
      expect(result.textContent).toBe(text);
    });
  });
});
