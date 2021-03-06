import React from 'react';

import Heading from '.';
import { a11yTest, render } from '../../../../test-utils';

describe('<Heading />', () => {
  it('should pass a11y tests', async () => {
    await a11yTest(<Heading>Heading</Heading>);
  });

  it('should render', () => {
    const { container } = render(<Heading>Heading</Heading>);

    expect(container).toBeInTheDocument();
  });

  describe('tag prop', () => {
    it('should render as an h1 by default with correct text', () => {
      const text = 'h1 tag';
      const { getByText } = render(<Heading>{text}</Heading>);
      const result = getByText(text);

      expect(result.nodeName).toBe('H1');
      expect(result.textContent).toBe(text);
    });

    it('should render as an h2 when passing h2 tag prop', () => {
      const text = 'h2 tag';
      const { getByText } = render(<Heading tag="h2">{text}</Heading>);
      const result = getByText(text);

      expect(result.nodeName).toBe('H2');
      expect(result.textContent).toBe(text);
    });

    it('should render as an h3 when passing h3 tag prop', () => {
      const text = 'h3 tag';
      const { getByText } = render(<Heading tag="h3">{text}</Heading>);
      const result = getByText(text);

      expect(result.nodeName).toBe('H3');
      expect(result.textContent).toBe(text);
    });

    it('should render as an h4 when passing h4 tag prop', () => {
      const text = 'h4 tag';
      const { getByText } = render(<Heading tag="h4">{text}</Heading>);
      const result = getByText(text);

      expect(result.nodeName).toBe('H4');
      expect(result.textContent).toBe(text);
    });

    it('should render as an h5 when passing h5 tag prop', () => {
      const text = 'h5 tag';
      const { getByText } = render(<Heading tag="h5">{text}</Heading>);
      const result = getByText(text);

      expect(result.nodeName).toBe('H5');
      expect(result.textContent).toBe(text);
    });

    it('should render as an h6 when passing h6 tag prop', () => {
      const text = 'h6 tag';
      const { getByText } = render(<Heading tag="h6">{text}</Heading>);
      const result = getByText(text);

      expect(result.nodeName).toBe('H6');
      expect(result.textContent).toBe(text);
    });
  });
});
