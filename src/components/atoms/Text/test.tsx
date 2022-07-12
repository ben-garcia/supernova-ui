import React from 'react';

import { a11yTest, mockMatchMedia, render } from '@testUtils';
import Text from '.';

describe('<Text />', () => {
  beforeAll(() => mockMatchMedia());

  it('should pass a11y tests', async () => {
    await a11yTest(<Text>text</Text>);
  });

  it('should render', () => {
    const { container } = render(<Text>text</Text>);

    expect(container).toBeInTheDocument();
  });

  describe('tag prop', () => {
    it('should render an span by default with correct text', () => {
      const text = 'span tag';
      const { getByText } = render(<Text>{text}</Text>);
      const result = getByText(text);

      expect(result.nodeName).toBe('SPAN');
      expect(result.textContent).toBe(text);
    });

    it('should render as an abbr', () => {
      const text = 'abbreviation tag';
      const { getByText } = render(<Text tag="abbr">{text}</Text>);
      const result = getByText(text);

      expect(result.nodeName).toBe('ABBR');
      expect(result.textContent).toBe(text);
    });

    it('should render as an cite', () => {
      const text = 'citation tag';
      const { getByText } = render(<Text tag="cite">{text}</Text>);
      const result = getByText(text);

      expect(result.nodeName).toBe('CITE');
      expect(result.textContent).toBe(text);
    });

    it('should render as an del', () => {
      const text = 'delete tag';
      const { getByText } = render(<Text tag="del">{text}</Text>);
      const result = getByText(text);

      expect(result.nodeName).toBe('DEL');
      expect(result.textContent).toBe(text);
    });

    it('should render as an em', () => {
      const text = 'emphasis tag';
      const { getByText } = render(<Text tag="em">{text}</Text>);
      const result = getByText(text);

      expect(result.nodeName).toBe('EM');
      expect(result.textContent).toBe(text);
    });

    it('should render as an i', () => {
      const text = 'italic tag';
      const { getByText } = render(<Text tag="i">{text}</Text>);
      const result = getByText(text);

      expect(result.nodeName).toBe('I');
      expect(result.textContent).toBe(text);
    });

    it('should render as an ins', () => {
      const text = 'insert tag';
      const { getByText } = render(<Text tag="ins">{text}</Text>);
      const result = getByText(text);

      expect(result.nodeName).toBe('INS');
      expect(result.textContent).toBe(text);
    });

    it('should render as an kbd', () => {
      const text = 'keyboard tag';
      const { getByText } = render(<Text tag="kbd">{text}</Text>);
      const result = getByText(text);

      expect(result.nodeName).toBe('KBD');
      expect(result.textContent).toBe(text);
    });

    it('should render as an mark', () => {
      const text = 'highlight tag';
      const { getByText } = render(<Text tag="mark">{text}</Text>);
      const result = getByText(text);

      expect(result.nodeName).toBe('MARK');
      expect(result.textContent).toBe(text);
    });

    it('should render as an s', () => {
      const text = 'strikethrough tag';
      const { getByText } = render(<Text tag="s">{text}</Text>);
      const result = getByText(text);

      expect(result.nodeName).toBe('S');
      expect(result.textContent).toBe(text);
    });

    it('should render as an samp', () => {
      const text = 'sample tag';
      const { getByText } = render(<Text tag="samp">{text}</Text>);
      const result = getByText(text);

      expect(result.nodeName).toBe('SAMP');
      expect(result.textContent).toBe(text);
    });

    it('should render as an sub', () => {
      const text = 'subscript tag';
      const { getByText } = render(<Text tag="sub">{text}</Text>);
      const result = getByText(text);

      expect(result.nodeName).toBe('SUB');
      expect(result.textContent).toBe(text);
    });

    it('should render as an sup', () => {
      const text = 'superscript tag';
      const { getByText } = render(<Text tag="sup">{text}</Text>);
      const result = getByText(text);

      expect(result.nodeName).toBe('SUP');
      expect(result.textContent).toBe(text);
    });

    it('should render as an u', () => {
      const text = 'underline tag';
      const { getByText } = render(<Text tag="u">{text}</Text>);
      const result = getByText(text);

      expect(result.nodeName).toBe('U');
      expect(result.textContent).toBe(text);
    });
  });
});
