import React from 'react';

import Icon from './Icon';
import { a11yTest, mockMatchMedia, render } from '../../../test-utils';

describe('<Icon />', () => {
  beforeAll(() => mockMatchMedia());

  it('should pass a11y tests', async () => {
    await a11yTest(
      <Icon>
        <path d="125 1560" />
      </Icon>
    );
  });

  it('should render', () => {
    const { container } = render(
      <Icon>
        <path d="125 1560" />
      </Icon>
    );

    expect(container).toBeInTheDocument();
  });

  it('should render as an svg', () => {
    const { getByTestId } = render(
      <Icon data-testid="svg">
        <path d="125 1560" />
      </Icon>
    );
    const result = getByTestId('svg');

    expect(result.nodeName).toBe('svg');
  });

  it('should render path as children', () => {
    const path = <path d="125 1560" />;
    const { getByTestId } = render(<Icon data-testid="svg">{path}</Icon>);
    const result = getByTestId('svg').firstChild;

    expect(result!.nodeName).toBe('path');
  });
});
